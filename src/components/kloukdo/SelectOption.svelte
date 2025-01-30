<script>
    import { createEventDispatcher } from "svelte";

    export let title;
    export let options;
    export let value = "";

    const dispatch = createEventDispatcher();

    function handleChange(event) {
        dispatch('change', event.target.value);
    }
</script>

<div class="relative">
<label for="{title}" class="block mb-2 text-sm font-medium text-gray-900">
    {title}
</label>
<select
    bind:value={value}
    on:change={handleChange}
    name="{title}"
    class="border text-center text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  border-gray-300 text-black appearance-none"
    required
>
    <option value="">Select {title}</option>
    {#if options}
        
        {#each options as option}
            <option value={option.id}>{option.name}</option>
        {/each}
    {/if}
</select>
<svg 
        class="absolute right-3 top-[38px] w-5 h-5 pointer-events-none text-black"
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke-width="2" 
        stroke="currentColor"
    >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
</div>
