<script>
    import KLoukdoHeader from "$components/kloukdo/KLoukdoHeader.svelte";
    import SubMenuButton from "$components/materials/side-menu/SubMenuButton.svelte";
    import { getKLoukdoCategories } from "$providers/actions/kloukdo/kloukdocategory";
    import {getKLoukdoSubCategoriesByCategory , getKLoukdoSubCategories} from "$providers/actions/kloukdo/kloukdosubcategory";
    import {getKLoukdoProductsByCategory } from "$providers/actions/kloukdo/kloukdoproduct"
    import { page } from '$app/stores';

    import { onMount } from "svelte";

    let categoryId = $page.params.cid;
    let productLimit = $page.params.cid;
    
  
    let Categories = [];
    let SubCategories = [];
    let selectedBrand = "all";
    let sortBy = "default";
    let priceFilter = "all";
    let gridView = true;
    let products = [];
  
    const loadCategories = async () => {
      try {
        const res = await getKLoukdoCategories.load();
        Categories = res.data;
      } catch (err) {
        console.error(err);
      }
    };

    const loadSubCategories = async () => {
        const res = await getKLoukdoSubCategoriesByCategory.load({category:categoryId});
        SubCategories = res.data;
        console.log(SubCategories)
    }


    const loadProductByCategory = async () => {
        const res = await getKLoukdoProductsByCategory.load({category:categoryId , limit:productLimit});
        products = res.data;
        console.log(products)
    }

//     const loadProductByCategoryedit = async () => {
//     try {
//         console.log("Fetching products by category...");

//         const res = await getKLoukdoProductsByCategory.load({ category:categoryId });

//         console.log("Response:", res);
        
//         products = res.data;

//         console.log("Products:", products);
//     } catch (err) {
//         console.error("Error fetching products:", err);
//     }
// };

  
    onMount(async () => {
      await loadCategories();
      await loadSubCategories();
      await loadProductByCategory();
      await loadProductByCategory();
    });
  
    const toggleView = () => {
      gridView = !gridView;
    };
  </script>
  
  <div class="flex flex-col mx-auto px-3 w-96 border overflow-y-scroll">
    <!-- Header with Search -->
    <KLoukdoHeader />
    <div class="flex items-center justify-between p-3">
      <button class="text-lg">⬅</button>
      <h1 class="text-lg font-bold">K-Luokdo</h1>
    </div>
  
    <div class="flex items-center gap-2 p-2">
      <select class="border p-2 rounded">
        <option>ទូរស័ព្ទ</option>
      </select>
      <input type="text" placeholder="ស្វែងរកទីនេះ" class="flex-grow border p-2 rounded" />
    </div>
  
    <!-- Filter by Brand -->
        <div class="flex gap-3 p-2 overflow-x-auto">
            {#each SubCategories as subCategory}
            <button
                class="px-4 py-2 rounded-md {selectedBrand === subCategory ? 'bg-gray-800 text-white' : 'bg-gray-200'}"
                on:click={() => selectedBrand = subCategory}
            >
                {subCategory.name}
            </button>
            {/each}
        </div>
  
  
    <!-- Sort & View Toggle -->
    <div class="flex justify-between items-center p-2">
      <div class="flex gap-2">
        <select bind:value={sortBy} class="border p-2 rounded">
          <option value="default">Sort</option>
          <option value="price-low">Price Low to High</option>
          <option value="price-high">Price High to Low</option>
        </select>
        <select bind:value={priceFilter} class="border p-2 rounded">
          <option value="all">Price</option>
        </select>
      </div>
      <button on:click={toggleView} class="p-2 border rounded">
        {gridView ? "🔲" : "📄"}
      </button>
    </div>
  
    <!-- Product Grid -->
    <div class={gridView ? "grid grid-cols-2 gap-3 p-2" : "flex flex-col gap-3 p-2"}>
      {#each SubCategories as product}
        <div class="border p-2 rounded-md">
          <img src={product.image} alt={product.name} class="w-full h-40 object-cover rounded-md" />
          <h2 class="text-sm mt-2">{product.name}</h2>
          <p class="font-bold">{product.price}</p>
          {#if product.isAd}
            <p class="text-xs text-gray-500">Ads</p>
          {/if}
        </div>
      {/each}
    </div>
  </div>