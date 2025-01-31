<script>
  import KLoukdoFooter from "$components/kloukdo/KLoukdoFooter.svelte";
  import KLoukdoHeader from "$components/kloukdo/KLoukdoHeader.svelte";
  import { page } from '$app/stores';
  import { onMount } from "svelte";
  import { getAllKLoukdoProducts, getKLoukdoProductById, getKLoukdoProductsBySubCategory } from "$providers/actions/kloukdo/kloukdoproduct";
  import KLoukdoProductListItem from "$components/kloukdo/KLoukdoProductListItem.svelte";
  import { getRandomKLoukdoPromotions } from "$providers/actions/kloukdo/kloukdopromotion";
  import { goto } from "$app/navigation";

  let productId = $page.params.pid;

  let product = {};
  let Products = [];
  let Promotions = [];

  let imgLoaded = false;

  let displayTime;
  
  const secondsIn1Month = 2629800;
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const loadProduct = async () => {
    try {
      const res = await getKLoukdoProductById.load({ id:productId });
      product = res.data;
      
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
    const loadProducts = async () => {
        try {
            const res = await getKLoukdoProductsBySubCategory.load({subCategory:product.subCategory.id, limit:14});
            Products = res.data;
        } catch (error) {
            
        }
        console.log(Products)
    }

  const calcCreatedDate = () => {
    let timeBetween;
    let identifier;
    let date = new Date(product.createdAt);
    const diffTime = Math.abs(new Date() - date);
    timeBetween = Math.floor(diffTime / (1000));
    if (timeBetween >= secondsIn1Month) {
        displayTime = date.getDate() + "-" + months[date.getMonth()] + "-" + date.getFullYear()
    }else {
        identifier = "seconds";
        if (timeBetween >= 60) {
            timeBetween = Math.floor(timeBetween / (60));
            identifier = "minutes";
            if (timeBetween >= 60) {
                timeBetween = Math.floor(timeBetween / (60));
                identifier = "hours";
                if (timeBetween >= 24) {
                    timeBetween = Math.floor(timeBetween / (24));
                    identifier = "days";
                    if (timeBetween >= 7) {
                        timeBetween = Math.floor(timeBetween / (7));
                        identifier = "weeks";
                    }
                }
            }
        }
        displayTime = timeBetween + " " + identifier + " ago"
        if (timeBetween == 1) {
            if (identifier == "days") displayTime = "yesterday"
            if (identifier == "weeks") displayTime = "last week"
            if (identifier == "hours") displayTime = "1 hour ago"
            if (identifier == "minutes") displayTime = "1 minute ago"
        }
    }
    
  }
  
  onMount( async () => {
    await loadProduct();
    await loadProducts();
    await loadPromotion();
    calcCreatedDate();

    console.log(product.photos.length)
  });

  let a =[];

</script>
<div class="flex flex-col mx-auto w-96 border-blue-400 border overflow-y-scroll">
    <KLoukdoHeader goBack={true}/>
    {#if product.id}
        
    <div class="flex flex-col gap-1">
        {#if product.photos != 0}
            <img
                class:hidden={!imgLoaded}
                class="w-full h-60 object-cover"
                src={product.photos[0].url}
                alt=""
                on:load={() => (imgLoaded = true)}
            />
            <div class="flex gap-1">
                {#each product.photos.slice(1) as photo, index}
                    {#if index < 3}
                        <div class="{ index === 2 ? "relative" : "" }"> 
                            <img
                                class="{ index === 2 ? "brightness-50" : "" } object-cover h-28"
                                src={photo.url}
                                alt={`Photo ${index + 1}`}
                            />
                            {#if index === 2 }
                                <div class="absolute translate-x-[50%] translate-y-[-50%] top-1/2 right-1/2 text-white">+{product.photos.length - 3}</div>
                            {/if}
                        </div>
                    
                    {/if}
                {/each}
            </div>
        {/if}
        
        <div class="flex flex-col px-5 gap-3">
            <div class="flex flex-col gap-1">
                {#if product.name}
                    <p class="text-xl font-bold">
                        {product.name}
                    </p>
                {/if}
                
                <p>{displayTime}</p>
                {#if product?.price?.hasDiscount}
                    <div class=" w-full">
                    <div class=" text-sm line-through text-red-500">
                        {product.price.price}$
                    </div>
                    <div class="font-bold text-2xl text-red-500">
                        {product.price.discountPrice}$
                    </div>
                    </div>
                {:else}
                    <div class="flex justify-between w-full align-bottom">
                        <div class="font-bold text-2xl text-red-500 py-1">
                        {product?.price?.price ?? ""}$
                        </div>
                    </div>
                {/if}
            </div>
            <div class="flex flex-col gap-1">
                <p class="text-xl font-bold">Description</p>
                <!-- <p>id: {product.id}</p> -->
                {#if product.category}
                    <p>Category: {product.category.name}</p>
                {/if}
                {#if product.subCategory}
                    <p>Sub Category: {product.subCategory.name}</p>
                {/if}
            </div>

            <div class="flex flex-col gap-1 mb-5">
                <p class="text-xl font-bold">Contact</p>
                {#if product.user}
                    <p>Seller: {product.user.firstName} {product.user.lastName}</p>
                    <p>Phone: {product.user.phone}</p>
                {/if}
            </div>
            
            <div>
                <div class="text-xl font-bold">Check out other products</div>
                <div class="">
                    <div class="grid gap-5 grid-cols-2">
                        {#each Promotions as promo }
                            {#if promo.product.id != product.id}
                                <KLoukdoProductListItem
                                    product={promo.product}
                                    isAds={true}
                                    on:select={(evt) => {
                                        let product = evt.detail;
                                    }}
                                />
                            {/if}
                        {/each}
                    </div>
                </div>
                <div class="mt-5">
                    <div class="grid gap-5 grid-cols-2">
                        {#each Products as pro }
                            {#if pro.id != product.id}
                                <KLoukdoProductListItem
                                    product={pro}
                                    on:select={(evt) => {
                                        let product = evt.detail.product;
                                    }}
                                />
                            {/if}
                        {/each}
                    </div>
                </div> 
            </div>

        </div>
    
    </div>
    
    {/if}

    <KLoukdoFooter/>
</div>
