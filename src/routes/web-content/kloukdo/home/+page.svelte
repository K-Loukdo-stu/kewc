<script>
  import KLoukdoHeader from "$components/kloukdo/KLoukdoHeader.svelte";
  import KLoukdoProductListItem from "$components/kloukdo/KLoukdoProductListItem.svelte";
  import { getKLoukdoAdsImage } from "$providers/actions/kloukdo/kloukdoadsimage";
  import { getKLoukdoCategories } from "$providers/actions/kloukdo/kloukdocategory";
  import { getAllKLoukdoProducts } from "$providers/actions/kloukdo/kloukdoproduct";
  import { getRandomKLoukdoPromotions } from "$providers/actions/kloukdo/kloukdopromotion";
  import { onDestroy, onMount } from "svelte";
  import ProductDisplayOption from "$components/kloukdo/ProductDisplayOption.svelte";
  import KLoukdoProductListView from "$components/kloukdo/KLoukdoProductListView.svelte";
  import KLoukdoFooter from "$components/kloukdo/KLoukdoFooter.svelte";

    let Categories = [];
    let Ads = [];
    let Promotions = [];
    let Products = [];
    let currentAds = 0;
    let Page;
    let totalAds;
    const intervalTime = 5000;

    let display = 1; //1. window display 2. list display

    let currentPage = 1;
    let currentLimit = 14;
    
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
            const res = await getAllKLoukdoProducts.load({page:currentPage-1, limit:currentLimit});
            // Products = res.data.product;
            // Products.push.apply(Products, res.data.product);
            Products = [...Products, ...res.data.product];
            // console.log(Products)
            Page = res.data.page;
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


	onMount(async () => {
		await loadCategories();
        await loadAds();
        await loadPromotion();
        await loadProduct();

        totalAds = Ads.length;

	});





</script>


<div class="flex flex-col mx-auto w-96 border-blue-400 border relative overflow-y-scroll"
    on:scroll={updateY}
>
    <KLoukdoHeader/>
    
    <div class="">
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
        <div >
            <div class="grid grid-cols-3 gap-5 mt-5 p-3">
                {#each Categories as category }
                    <div class="m-auto bg-white p-2 rounded-md text-center h-24 w-20 flex flex-col">
                        {#if category.icon}
                            <a href="/web-content/kloukdo/category/{category.id}">
                                <img src="{category.icon}" alt="" class="w-9 h-9 m-auto">
                            </a>
                        {:else}
                            <a href="/web-content/kloukdo/category/{category.id}">
                                <img
                                class=" w-9 h-9 m-auto"
                                src="https://cdn.worldvectorlogo.com/logos/standout-stickers-1.svg"
                                alt=""
                                />
                            </a>
                        {/if}
                        <p class=" text-sm">{category.name}</p>
                    </div>
                {/each}
        
            </div>
            
        </div>
        <div class=" p-2">
            <ProductDisplayOption
                on:window={() => {display = 1}}
                on:list={() => {display = 2}}
                display={display}
            />

            {#if display == 1}
                <div>Promotion</div>
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
                <div>Trending</div>
                <div class="">
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
            <div>Promotion</div>
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
                <div>Trending</div>
                <div class="">
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

    {#if oldY >= y }
        <a class="fixed bottom-5 right-1/2 translate-x-[50%] rounded-full bg-blue-400 p-3 text-white"
            href="/web-content/kloukdo/product/create"
        >
            <svg class="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path></svg>
        </a>
    {/if}
    
    {#if currentPage < Page}
        <div class="m-auto my-5 bg-blue-400 text-white p-2 py-1 rounded-md flex justify-center items-center">
            <button
                on:click={async () => {
                    currentPage +=1;
                    await loadProduct();
                }}
            >
                load more
            </button>
        </div>
    {/if}
    
    <KLoukdoFooter/>
</div>