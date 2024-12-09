<script>
    export let src;
    export let alt;
    export let classStyles = "";

    let loaded = false;
</script>

<img
    on:load={() => {
        loaded = true;
    }}
    hidden={!loaded}
    {src}
    {alt}
    class={`w-full h-full ${classStyles} `}
/>
