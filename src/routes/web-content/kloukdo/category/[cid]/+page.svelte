<script>
  import { onMount } from "svelte";
  import { page } from '$app/stores';
  import { getKLoukdoSubCategoriesByCategory } from "$providers/actions/kloukdo/kloukdosubcategory";
  import KLoukdoHeader from "$components/kloukdo/KLoukdoHeader.svelte";

    let categoryId = $page.params.cid;
    
    let SubCategories = [];

    const loadSubCategories = async () => {
        const res = await getKLoukdoSubCategoriesByCategory.load({category:categoryId});
        SubCategories = res.data;
    }

    onMount(async () => {
        await loadSubCategories();
        console.log(slug)
    })
</script>

<div class="flex flex-col mx-auto w-96 border-blue-400 border overflow-y-scroll">
    <KLoukdoHeader goBack={true} />
    {#each SubCategories as subCate}
        <div>
            {subCate.name}
        </div>
    {/each}
</div>