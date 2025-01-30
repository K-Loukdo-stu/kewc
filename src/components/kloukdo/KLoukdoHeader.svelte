<script>
    export let goBack = false;
</script>
<div class=" text-xl font-bold m-auto sticky top-0 z-50 bg-blue-400 w-full text-center py-2 text-white">
    <div class="relative">
        {#if goBack}
            <button onclick="history.back()" class="absolute left-3">
                <svg class="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path></svg>
            </button>
        {/if}
        <a href="/web-content/kloukdo/home">K-Loukdo</a>
        
    </div>
</div>