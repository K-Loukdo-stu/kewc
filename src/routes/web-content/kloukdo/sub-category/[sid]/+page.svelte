<script>
    import KLoukdoHeader from "$components/kloukdo/KLoukdoHeader.svelte";
    import SubMenuButton from "$components/materials/side-menu/SubMenuButton.svelte";
    import { getKLoukdoCategories } from "$providers/actions/kloukdo/kloukdocategory";
    import {getKLoukdoSubCategoriesByCategory , getKLoukdoSubCategories} from "$providers/actions/kloukdo/kloukdosubcategory";
    import {getKLoukdoProductsByCategory , getKLoukdoProductsBySubCategory} from "$providers/actions/kloukdo/kloukdoproduct"
    import { getKLoukdoAdsImage } from "$providers/actions/kloukdo/kloukdoadsimage";
    import KLoukdoFooter from "$components/kloukdo/KLoukdoFooter.svelte";


    import { page } from '$app/stores';

    import { onMount } from "svelte";
  import KLoukdoProductListItem from "$components/kloukdo/KLoukdoProductListItem.svelte";
  import KLoukdoProductListView from "$components/kloukdo/KLoukdoProductListView.svelte";
  import ProductDisplayOption from "$components/kloukdo/ProductDisplayOption.svelte";

    let categoryId = $page.params.sid;
    let categoryName = "";
    
  
    let Categories = [];
    let SubCategories = [];
    let Ads = [];
    let SubProducts = []

    let selectedBrand = "all";
    let sortBy = "default";
    let priceFilter = "all";
    let gridView = true;
    let currentAds = 0;
    let totalAds;
    const intervalTime = 5000;


    let display = 1;

    let products = [];
  
    // const loadCategories = async () => {
    //   try {
    //     const res = await getKLoukdoCategories.load();
    //     const Contegories = res.data
    //     const category = Contegories.find(cat => cat.id === categoryId);
    //     console.log(category)
    //       if (category) {
    //         categoryName = category.name;
    // }
    //   } catch (err) {
    //     console.error(err);
    //   }
    // };

    const loadAds = async () => {
        try {
            const res = await getKLoukdoAdsImage.load({page:0});
            Ads = res.data;
        } catch (error) {
            
        }
    }


    setInterval(function () {
        setTimeout(500)
        currentAds = (currentAds + 1) % Ads.length;
    }, intervalTime);


    let y = 0;
    let newY = [0, 0];
    $: oldY = newY[1];

    function updateY(event){
        y = event.target.scrollTop
        newY.push(y);
        if(newY.length > 5) {
            newY.shift();
        }
        newY=newY;
    }


    // const loadSubCategories = async () => {
    //     const res = await getKLoukdoSubCategoriesByCategory.load({category:categoryId});
    //     SubCategories = res.data;
    //     console.log(SubCategories)
    // }


    // const loadProductByCategory = async () => {
    //     const res = await getKLoukdoProductsByCategory.load({category:categoryId , limit:2});
    //     products = res.data;
    //     console.log({products})
    // }

    const loadProductBySubCategory = async () => {
      console.log(categoryId)
        const res = await getKLoukdoProductsBySubCategory.load({subCategory:categoryId , limit:14});
        SubProducts = res.data;
        console.log({SubProducts})
    }
  
    onMount(async () => {
      // await loadCategories();
      // await loadSubCategories();
      // await loadProductByCategory();
      await loadProductBySubCategory()
      await loadAds();

      totalAds = Ads.length;

    });
  
    const toggleView = () => {
      gridView = !gridView;
    };
  </script>
  
  <div class="flex flex-col mx-auto px-3 w-96 border overflow-y-scroll"
    on:scroll={updateY}
div>
    <!-- Header with Search -->
    <KLoukdoHeader 
    goBack = {true}/>
  
    <div class="m-auto relative w-full">
      {#each Ads as ad, i}
          {#if i === currentAds}
              <div class="" >
                  <img
                      class="w-full h-44 object-cover"
                      src="{ad.image.url}"
                      alt="{ad.name}" />
              </div>
          {/if}
      {/each}

      <div class="absolute bottom-[3px] right-2/4 translate-x-[50%]">
          <div class="flex gap-2">
              
              {#each Array(totalAds) as _, index }
              
                  <button class=""
                      on:click={() => {
                          currentAds = index
                      }}    
                  >
                      <div class="rounded-full w-[8px] h-[8px] {currentAds === index ? 'bg-black' : 'bg-white'} border border-gray-400"></div>
                  </button>
              {/each}
          </div>

      </div>

  </div>
  
    <div class="flex items-center gap-2 p-2">
      <select class="border p-2 rounded">
        <option>{categoryName}</option>
      </select>
      <input type="text" placeholder="ស្វែងរកទីនេះ" class="flex-grow border p-2 rounded" />
    </div>
  
    <!-- Filter by Brand
        <div class="flex gap-3 p-2 overflow-x-auto">
            {#each SubProducts as subCategory}
              <div class="m-auto bg-white p-2 rounded-md text-center h-20">
                {#if subCategory.icon}
                    <a href="/web-content/kloukdo/sub-category">
                        <img src="{subCategory.icon}" alt="" class="w-9 h-9 m-auto">
                    </a>
                    <p class=" text-sm">{subCategory.name}</p>
                    
                {:else}
                <a href="/web-content/kloukdo/sub-category">
                    <img
                    class=" w-10 h-10 m-auto"
                    src="https://cdn.worldvectorlogo.com/logos/standout-stickers-1.svg"
                    alt=""
                /><p class=" text-sm">{subCategory.name}</p>
                </a>
                {/if}
            </div>

            {/each}
        </div> -->
  
  
    <!-- Sort & View Toggle -->
    <!-- <div class="flex justify-between items-center p-2">
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
    </div> -->

    
    <div class=" p-2">
      <ProductDisplayOption
          on:window={() => {display = 1}}
          on:list={() => {display = 2}}
          display={display}
      />

      {#if display == 1}
          <!-- <div>Promotion</div>
          <div class="mb-3">
              <div class="grid gap-5 grid-cols-2">
                  {#each Promotions as promo }
                      <KLoukdoProductListItem
                          product={promo.product}
                          on:select={(evt) => {
                              let product = evt.detail;
                          }}
                      />
                  {/each}
              </div>
          </div>
          <div>Trending</div> -->
          <div class="">
              <div class="grid gap-5 grid-cols-2">
                  {#each SubProducts as pro }
                      <KLoukdoProductListItem
                          product={pro}
                          on:select={(evt) => {
                              let product = evt.detail;
                          }}
                      />
                  {/each}
              </div>
          </div>
      {:else if display == 2}
      <!-- <div>Promotion</div>
          <div class="mb-3">
              <div class="flex flex-col gap-5">
                  {#each Promotions as promo }
                      <KLoukdoProductListView
                          product={promo.product}
                          on:select={(evt) => {
                              let product = evt.detail;
                          }}
                      />
                  {/each}
              </div>
          </div>
          <div>Trending</div> -->
          <div class="">
              <div class="flex flex-col gap-5">
                  {#each SubProducts as pro }
                      <KLoukdoProductListView
                          product={pro}
                          on:select={(evt) => {
                              let product = evt.detail;
                          }}
                      />
                  {/each}
              </div>
          </div>
      {/if}
      
  </div>
  
    <!-- Product Grid -->
    <!-- <div class={gridView ? "grid grid-cols-2 gap-3 p-2" : "flex flex-col gap-3 p-2"}>
      {#each SubProducts as subProducts}
        <div class="border p-2 rounded-md">
          <img src={subProducts.photos} alt={subProducts.name} class="w-full h-40 object-cover rounded-md" />
          <h2 class="text-sm mt-2">{subProducts.name}</h2> 
          <p class="font-bold">{subProducts.price.price}  </p>
           {#if subProducts.isAd}
             <p class="text-xs text-gray-500">Ads</p>
          {/if}
        </div>
      {/each}
    </div> -->

  
    <KLoukdoFooter/>

  </div>

