<script>
  import KLoukdoHeader from "$components/kloukdo/KLoukdoHeader.svelte";
  import { getKLoukdoCategories } from "$providers/actions/kloukdo/kloukdocategory";
  import { onMount } from "svelte";

    let Categories = [];

    const loadCategories = async () => {
		try {
			const res = await getKLoukdoCategories.load();
			Categories = res.data;
		} catch (err) {
			// to do
		}
	};

    onMount(async () => {
		await loadCategories();
	});
</script>

<div class="flex flex-col mx-auto px-3 w-96 border-rose-500 border overflow-y-scroll">
    <KLoukdoHeader
    />
    
        <div>
            <div class="flex flex-col mt-5 gap-5 mb-5">
                {#each Categories as category }
                        {#if category.icon}
                            <a href="/web-content/kloukdo/category/{category.id}" id="{category.id}">
                                <div class="m-auto bg-slate-200 p-2 rounded-md w-full flex leading-10">
                                    <img src="{category.icon}" alt="" class="w-10 h-10 mr-5">
                                    <label for="{category.id}">{category.name}</label>
                                </div>
                            </a>
                        {:else}
                        <div class="m-auto bg-slate-200 p-2 rounded-md w-full flex leading-10">
                            <img
                                class=" w-10 h-10 mr-5"
                                src="https://cdn.worldvectorlogo.com/logos/standout-stickers-1.svg"
                                alt=""
                            />
                            <label for="{category.id}">{category.name}</label>
                        </div>
                        {/if}
                {/each}
        
            </div>
            
        </div>
        
    
</div>