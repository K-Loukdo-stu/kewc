<!-- Sample code for create product or subproduct and search
<script>
	import { onMount } from 'svelte';
	let clients = ["a Little piggy","b little piggy","c little piggy"]; //hard coded api data
	let clientsClone = [...clients];
    let indexVal = -1;
    let downArrowPress = 40;
    let upArrowPress = 38;
    let clientInputTextField = "";
    let selectedClient = "";

     //______________________BEGIN focus input field on page load

   	 onMount(function() {
	 	clientInputTextField.focus();
	 });

	 //_______________________END focus input field on page load.


     // ______________________BEGIN instant search algorithm 
	function instantSearch(query,listArr) {
		let arr = [...listArr]
	    let newList = []

	   arr.map(val =>{
			query.split(" ").map(word =>{
				if(val.toLowerCase().indexOf(word.toLowerCase()) != -1){
					newList.push(val)
				}
			})
	   })
       
       console.log(newList)
	   return newList
	}
	//_________________________END instant search algorithm


	function handleKeydown(event){
        
    
        if(event.keyCode === upArrowPress){
           indexVal-=1;    
           indexVal = indexVal < 0 ?  clients.length : indexVal
           console.log(indexVal);
		}

		if(event.keyCode === downArrowPress){
           indexVal+=1;
           indexVal = indexVal > clients.length ?  0 : indexVal
           console.log(indexVal);
		}

		if(indexVal > clients.length -1 || indexVal < 0){
           clientInputTextField.focus(); 
        }else{
        	clientInputTextField.blur()
        }
	
	 }

     
     function searchItems(event){
     	let result = instantSearch(event.target.value, clients);
     	clientsClone = [...result]
     	
     }


     function handleSubmit(){
  
     	clients.push(selectedClient)
     	selectedClient = "";


     }




</script>


<svelte:window on:keydown={handleKeydown}/>

<form on:submit|preventDefault={handleSubmit}>
	<input type="text" name=""  on:input={searchItems} bind:this={clientInputTextField} bind:value={selectedClient}>
	<input type="submit" name="">
</form>



<ul>
	{#each clientsClone as client, i}
		{#if i === indexVal}
		    <li style="background-color:orange">{client}</li>
		    {:else}
		    <li style="">{client}</li>
		{/if}
	{/each}
</ul> -->

<script>
	import { goto } from "$app/navigation";
	import UserSearchBox from "$components/elements/dashboard/user/UserSearchBox.svelte";
</script>

<div class=" w-full h-full overflow-y-auto">
	<div class="w-full">
		<UserSearchBox
			on:select={(evt) => {
				goto(`/dashboard/user/news-feed/${evt.detail.user.id}`);
			}}
		/>
	</div>
	<div class=" w-full">
		<slot />
	</div>
</div>
<!-- 
<script>
	import { goto } from "$app/navigation";
	import ChannelSearchBox from "$components/elements/dashboard/channel/ChannelSearchBox.svelte";
  </script>
  
  <div class=" w-full h-full overflow-y-auto">
	<div class="w-full">
	  <ChannelSearchBox
		on:select={(evt) => {
		  goto(`/dashboard/kchannel/profile/as-admin/${evt.detail.channel.id}`);
		}}
	  />
	</div>
	<div class=" w-full">
	  <slot />
	</div>
  </div> -->
