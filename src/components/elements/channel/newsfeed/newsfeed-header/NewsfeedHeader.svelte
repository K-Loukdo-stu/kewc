<script>
    import Photo from "$components/icons/Photo/Photo.svelte";
    import CartAdd from "$components/icons/cart/CartAdd.svelte";
</script>

<div class="flex-grow-0 flex items-center justify-around p-2 space-x-4 h-full">
    <div class="cursor-pointer hover:text-gray-600 text-gray-500">
        <Photo w={20} />
    </div>
    <div class="cursor-pointer hover:text-gray-600 text-gray-500">
        <CartAdd />
    </div>
</div>
<div class="flex-grow h-full">
    <input
        disabled
        class=" pointer-events-none h-full w-full rounded-lg flex items-start pl-2 bg-[#F0F0F0] outline-none"
        type="text"
        placeholder="What's on your thought?"
    />
</div>
