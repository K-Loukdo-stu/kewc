<script>
  import KLoukdoHeader from "$components/kloukdo/KLoukdoHeader.svelte";
  import KLoukdoProductListItem from "$components/kloukdo/KLoukdoProductListItem.svelte";
  import { getKLoukdoAdsImage } from "$providers/actions/kloukdo/kloukdoadsimage";
  import { getKLoukdoCategories } from "$providers/actions/kloukdo/kloukdocategory";
  import { getAllKLoukdoProducts } from "$providers/actions/kloukdo/kloukdoproduct";
  import { getRandomKLoukdoPromotions } from "$providers/actions/kloukdo/kloukdopromotion";
  import { onMount } from "svelte";
  import CorouselSlide from "$components/kloukdo/CorouselSlide.svelte";
  import ProductDisplayOption from "$components/kloukdo/ProductDisplayOption.svelte";
  import KLoukdoProductListView from "$components/kloukdo/KLoukdoProductListView.svelte";
  import KLoukdoFooter from "$components/kloukdo/KLoukdoFooter.svelte";

    let Categories = [];
    let Ads = [];
    let Promotions = [];
    let Products = [];
    let currentAds = 0;
    let totalAds;
    const intervalTime = 5000;

    let display = 2; //1. window display 2. list display

    let currentPage = 0;
    let currentLimit = 15;
    
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
    const loadProduct = async () => {
        try {
            const res = await getAllKLoukdoProducts.load({page:currentPage, limit:currentLimit});
            Products = res.data;
        } catch (error) {
            
        }
    }

    setInterval(function () {
        setTimeout(500)
        currentAds = (currentAds + 1) % Ads.length;
    }, intervalTime);

	// When Operating start run it first
	onMount(async () => {
		await loadCategories();
        await loadAds();
        await loadPromotion();
        await loadProduct();

        totalAds = Ads.length;
	});
</script>

<div class="flex flex-col mx-auto w-96 border-blue-400 border overflow-y-scroll">
    <KLoukdoHeader/>
    
    <div class="">
        <div class="m-auto relative w-full">
            {#each Ads as ad, i}
                {#if i === currentAds}
                    <div class=""
                        >
                        <img
                            class="w-full h-44 bg-slate"
                            src="{ad.image.url}"
                            alt="{ad.name}" />
                    </div>
                {/if}
            {/each}
            <!-- <CorouselSlide
                items={Ads};
            /> -->

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
        <div >
            <div class="grid grid-cols-4 gap-5 my-5">
                {#each Categories as category }
                    <div class="m-auto bg-slate-200 p-2 rounded-md">
                        {#if category.icon}
                            <a href="/web-content/kloukdo/category/{category.id}">
                                <img src="{category.icon}" alt="" class="w-10 h-10">
                            </a>
                        {:else}
                        <a href="/web-content/kloukdo/category/{category.id}">
                            <img
                            class=" w-10 h-10 m-auto"
                            src="https://cdn.worldvectorlogo.com/logos/standout-stickers-1.svg"
                            alt=""
                        />
                        </a>
                        {/if}
                    </div>
                {/each}
        
            </div>
            
        </div>
        <div class=" bg-white p-2">
            <ProductDisplayOption
                on:window={() => {display = 1}}
                on:list={() => {display = 2}}
            />

            {#if display == 1}
                <div class="">
                    <div class="flex gap-5">
                        {#each Promotions as promo }
                            <KLoukdoProductListItem
                                product={promo.product}
                                isAds={true}
                                on:select={(evt) => {
                                    let product = evt.detail;
                                }}
                            />
                        {/each}
                    </div>
                </div>
                <div class="mt-5">
                    <div class="grid gap-5 grid-cols-2">
                        {#each Products as pro }
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
                <div class="">
                    <div class="flex flex-col gap-5">
                        {#each Promotions as promo }
                            <KLoukdoProductListView
                                product={promo.product}
                                isAds={true}
                                on:select={(evt) => {
                                    let product = evt.detail;
                                }}
                            />
                        {/each}
                    </div>
                </div>
                <div class="mt-5">
                    <div class="flex flex-col gap-5">
                        {#each Products as pro }
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
        
    </div>
    <KLoukdoFooter/>
</div>