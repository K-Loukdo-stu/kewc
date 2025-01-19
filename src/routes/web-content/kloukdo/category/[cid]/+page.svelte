<script>
  import { onMount } from "svelte";
  import { page } from '$app/stores';
  import { getKLoukdoSubCategoriesByCategory } from "$providers/actions/kloukdo/kloukdosubcategory";

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

<div>
    {#each SubCategories as subCate}
        <div>
            {subCate.name}
        </div>
    {/each}
</div>