<script>
  import ProductList from "$components/elements/channel/product-list/ProductList.svelte";
  import ProductListItem from "$components/elements/channel/product-list/ProductListItem.svelte";
  import ProductViewer from "$components/elements/product/view/ProductViewer.svelte";
  import KLoukdoProductListItem from "$components/kloukdo/KLoukdoProductListItem.svelte";
import { getKLoukdoAdsImage } from "$providers/actions/kloukdo/kloukdoadsimage";
  import { getKLoukdoCategories } from "$providers/actions/kloukdo/kloukdocategory";
  import { getAllKLoukdoPromotios, getRandomKLoukdoPromotions } from "$providers/actions/kloukdo/kloukdopromotion";
  import { onMount } from "svelte";

    let Categories = [];
    let Ads = [];
    let Promotions = [];
    let currentAds = 0;
    const intervalTime = 5000;
    
    const loadCategories = async () => {
		try {
			const res = await getKLoukdoCategories.load();
			Categories = res.data;
		} catch (err) {
			// to do
		}
	};
    const loadAds = async () => {
        try {
            const res = await getKLoukdoAdsImage.load({page:0});
            Ads = res.data;
        } catch (error) {
            
        }
    }
    const loadPromotion = async () => {
        try {
            const res = await getRandomKLoukdoPromotions.load();
            Promotions = res.data;
        } catch (error) {
            
        }
    }


    setInterval(function () {
        currentAds = (currentAds + 1) % Ads.length;
    }, intervalTime);

	// When Operating start run it first
	onMount(async () => {
        // console.log("hi")
		await loadCategories();
        await loadAds();
        await loadPromotion();

        console.log(Promotions);
	});
</script>

<div class="flex flex-col mx-auto px-5 w-full">
    <div class=" text-xl font-bold m-auto">
        K-Loukdo
    </div>
    <div class="m-auto mt-1 relative w-full">
        {#each Ads as ad, i}
            {#if i === currentAds}
                <div class="">
                    <img
                        class="w-full h-44 rounded-lg bg-slate"
                        src="{ad.image.url}"
                        alt="{ad.name}" />
                </div>
            {/if}
        {/each}
        <!-- <div class="absolute top-[5rem] left-3 bg-white flex justify-center border border-gray-600 p-1 rounded-md">
            <button>
                <svg
                    class="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor">
                    <path d="M8 12L14 6V18L8 12Z"></path>
                </svg>
            </button>
        </div>
        <div class="absolute top-[5rem] right-3">
            <button>
                <svg 
                    class="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor">
                    <path d="M16 12L10 18V6L16 12Z"></path>
                </svg>
            </button>
        </div> -->

    </div>
    <div class="grid grid-cols-4 gap-1 mt-5">
        {#each Categories as category }
            <div class="m-auto bg-slate-200 p-2 rounded-md">
                {#if category.icon}
                    <a href="/web-content/kloukdo/category/{category.id}">
                        <img src="{category.icon}" alt="" class="w-10 h-10">
                    </a>
                {:else}
                <img
                    class=" w-10 h-10 m-auto"
                    src="https://cdn.worldvectorlogo.com/logos/standout-stickers-1.svg"
                    alt=""
                />
                {/if}
            </div>
        {/each}

    </div>

    <div class="mt-5">
        <p>Promotion</p>
        <div class="flex gap-5">
            {#each Promotions as promo }
                <KLoukdoProductListItem
                    product={promo.product}
                    on:select={(evt) => {
                        let product = evt.detail;
                        console.log(product.product)
                    }}
                />
            {/each}
        </div>
    </div>
</div>