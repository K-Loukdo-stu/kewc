<script>
  import KLoukdoFooter from "$components/kloukdo/KLoukdoFooter.svelte";
import KLoukdoHeader from "$components/kloukdo/KLoukdoHeader.svelte";

</script>
<div  class="flex flex-col mx-auto w-96 border-blue-400 border overflow-y-scroll">
    <!-- <KLoukdoHeader/> -->
    <slot/>
    <!-- <KLoukdoFooter/> -->
</div>