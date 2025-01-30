<script>
  import { goto } from "$app/navigation";
  import CheckBox from "$components/kloukdo/CheckBox.svelte";
  import KLoukdoFooter from "$components/kloukdo/KLoukdoFooter.svelte";
  import KLoukdoHeader from "$components/kloukdo/KLoukdoHeader.svelte";
  import SelectOption from "$components/kloukdo/SelectOption.svelte";
  import { getKLoukdoCategories } from "$providers/actions/kloukdo/kloukdocategory";
  import { uploadImage } from "$providers/actions/kloukdo/kloukdoimage";
  import { createKLoukdoProduct } from "$providers/actions/kloukdo/kloukdoproduct";
  import { getKLoukdoSubCategoriesByCategory } from "$providers/actions/kloukdo/kloukdosubcategory";
  import { createEventDispatcher, onMount } from "svelte";

const dispatch = createEventDispatcher();
    let name;
    let price;
    let discountPrice = 0;
    let photos;
    let discount = false;

          
	let base64String = "data:image/jpeg;base64,";
    let allImage = [];
    // let height;
    // let width;
    // let size;
    let disabledCreate = false;
    
    let CategoryData;
    let subCategoryData;
    let category;
    let subCategory;
    let currency;

    let imgBlock1;
    let imgBlock2;
    let imgBlock3;
    let imgBlock4;
    let imgBlock5;

    const createdService = async (evt) => {
        evt.preventDefault();

        let allUploadedImage = [];

        for (const element of allImage.filter(item => item !== undefined)) {
            console.log({ element });
            let image = await uploadImage.load({
                height: element.height,
                name: element.name,
                size: element.size,
                width: element.width,
                base64: element.base64
            });

            let completeJsonImage = {
                bucket: "kstorage-bucket",
                contentType: "image/jpeg",
                height: element.height,
                width: element.width,
                key: image.key,
                thumbnail: { url: image.url, width: 100, height: 99 },
                url: image.url
            };

            allUploadedImage.push(completeJsonImage);
        }


        let res = await createKLoukdoProduct.load({
            name,
            category,
            subCategory,
            price,
            discountPrice,
            hasDiscount: discount,
            currency,
            photos: allUploadedImage
        });

        if (res.success) {
            disabledCreate = true;
            goto("/web-content/kloukdo/home")
        }
    };



    var imageUploaded = function(event, index) {
        const file = event.target.files[0]; // Get the first file from the file input
        let imageJson = {};
        // console.log(index)
        // var image = document.getElementById(`output${index}`);
        // console.log(image)
        switch (index) {
            case 1:
                imgBlock1 = URL.createObjectURL(file);
                console.log({imgBlock1})
                break;
            case 2:
                imgBlock2 = URL.createObjectURL(file);
                console.log({imgBlock2})
                break;
            case 3:
                imgBlock3 = URL.createObjectURL(file);
                console.log({imgBlock3})
                break;
            case 4:
                imgBlock4 = URL.createObjectURL(file);
                console.log({imgBlock4})
                break;
            case 5:
                imgBlock5 = URL.createObjectURL(file);
                console.log({imgBlock5})
                break;
        
        }
        if (file) {
        // File size and type
        imageJson.size = file.size;
        imageJson.name = file.name;
    
            // If the file is an image, get width and height
            if (file.type.startsWith("image/")) {
                const img = new Image();
                img.onload = () => {
                    imageJson.width = img.width;
                    imageJson.height = img.height;
                };
                img.src = URL.createObjectURL(file); // Create a URL for the image
            }
        }
        let reader = new FileReader();

        reader.onload = function () {
            let string = base64String + reader.result.replace("data:", "")
                .replace(/^.+,/, "");
            imageJson.base64 = string;
            
        }
        reader.readAsDataURL(file);
        if (index >= 1 && index <= 5) {
            // Replace imgBlock by index
            allImage[index - 1] = imageJson; // Update the image in the array based on index
        }
        // allImage.push(imageJson);
        console.log({allImage})
    }

    var loadFile = function(event, index) {
        var image = document.getElementById(`output${index}`);
        image.src = URL.createObjectURL(event.target.files[0]);
    };

    const loadCategories = async () => {
		try {
			const res = await getKLoukdoCategories.load();
			CategoryData = res.data;
		} catch (err) {
			// to do
		}
	};
	const loadSubCategories = async (category) => {
		try {
			const res = await getKLoukdoSubCategoriesByCategory.load({ category });
			subCategoryData = res.data;
		} catch (err) {
		}
	};

    onMount(async () => {
        await loadCategories();
    })
</script>


<div class="flex flex-col mx-auto w-96 border-blue-400 border relative overflow-y-scroll">
    <KLoukdoHeader
        goBack={true}
    />
                
    <div class="py-6 px-2 lg:px-8 w-full">
        <form
            class="space-y-6 w-full h-full flex flex-col"
            on:submit|preventDefault={createdService}
            method="post"
        >
            <div class="text-xl font-medium text-black text-center">
                Create A Product
            </div>
            <div class="w-full">
                <div class="mb-2">
                    <div class="block mb-2 text-sm font-medium text-gray-900">Photos</div>
                    <label for="photos">
                        <div class="flex justify-center items-center h-40 rounded-lg mb-2 text-sm font-medium text-gray-900 w-full border border-blue-400">
                            {#if !imgBlock1}
                                <svg class="w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M21 15V18H24V20H21V23H19V20H16V18H19V15H21ZM21.0082 3C21.556 3 22 3.44495 22 3.9934L22.0007 13.3417C21.3749 13.1204 20.7015 13 20 13V5H4L4.001 19L13.2929 9.70715C13.6528 9.34604 14.22 9.31823 14.6123 9.62322L14.7065 9.70772L18.2521 13.2586C15.791 14.0069 14 16.2943 14 19C14 19.7015 14.1204 20.3749 14.3417 21.0007L2.9918 21C2.44405 21 2 20.5551 2 20.0066V3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082ZM8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7Z"></path></svg>
                            {:else}
                                <img alt="" id="output"
                                    class="w-full object-cover h-40 rounded-lg"
                                    src="{imgBlock1}"
                                >
                            {/if}
                            
                        </div>
                    </label>
                    <input
                        required
                        accept="image/png, image/jpg, image/jpeg"
                        id="photos"
                        type="file"
                        name="photos"
                        bind:value={photos}
                        class="hidden border text-center text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400"
                        placeholder="Photos"
                        on:change={(event) => {imageUploaded(event, 1)}}
                    />
                </div>
                <div></div>
                
                    {#if imgBlock1}
                    <div>
                        Additional Photos (optional)
                        <div class="flex gap-1 overflow-x-scroll w-full">
                            <div class="shrink-0">
                                <label for="photos2">
                                    <div class="w-32 h-32 flex items-center justify-center rounded-lg mb-2 text-sm font-medium text-gray-900border border-blue-400 border">
                                        
                                        {#if !imgBlock2}
                                            <svg class="w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M21 15V18H24V20H21V23H19V20H16V18H19V15H21ZM21.0082 3C21.556 3 22 3.44495 22 3.9934L22.0007 13.3417C21.3749 13.1204 20.7015 13 20 13V5H4L4.001 19L13.2929 9.70715C13.6528 9.34604 14.22 9.31823 14.6123 9.62322L14.7065 9.70772L18.2521 13.2586C15.791 14.0069 14 16.2943 14 19C14 19.7015 14.1204 20.3749 14.3417 21.0007L2.9918 21C2.44405 21 2 20.5551 2 20.0066V3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082ZM8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7Z"></path></svg>
                                        {:else}
                                            <img alt="" id="output2"
                                                class="object-cover w-32 h-32 rounded-lg"
                                                src="{imgBlock2}"
                                            >
                                        {/if}
                                    </div>
                                </label>
                                <input
                                    accept="image/png, image/jpg, image/jpeg"
                                    id="photos2"
                                    type="file"
                                    name="photos2"
                                    bind:value={photos}
                                    class="hidden border text-center text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400"
                                    placeholder="Photos"
                                    on:change={(event) => {console.log(event); imageUploaded(event, 2)}}
                                />
                            </div>
                            <div class="shrink-0">
                                <label for="photos3">
                                    <div class="w-32 h-32 flex items-center justify-center rounded-lg mb-2 text-sm font-medium text-gray-900border border-blue-400 border">
                                        
                                        {#if !imgBlock3}
                                            <svg class="w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M21 15V18H24V20H21V23H19V20H16V18H19V15H21ZM21.0082 3C21.556 3 22 3.44495 22 3.9934L22.0007 13.3417C21.3749 13.1204 20.7015 13 20 13V5H4L4.001 19L13.2929 9.70715C13.6528 9.34604 14.22 9.31823 14.6123 9.62322L14.7065 9.70772L18.2521 13.2586C15.791 14.0069 14 16.2943 14 19C14 19.7015 14.1204 20.3749 14.3417 21.0007L2.9918 21C2.44405 21 2 20.5551 2 20.0066V3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082ZM8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7Z"></path></svg>
                                        {:else}
                                            <img alt=""
                                                class="object-cover w-32 h-32 rounded-lg"
                                                src="{imgBlock3}"
                                            >
                                        {/if}
                                    </div>
                                </label>
                                <input
                                    accept="image/png, image/jpg, image/jpeg"
                                    id="photos3"
                                    type="file"
                                    name="photos3"
                                    bind:value={photos}
                                    class="hidden border text-center text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400"
                                    placeholder="Photos"
                                    on:change={(event) => {console.log(event); imageUploaded(event, 3)}}
                                />
                            </div>
                            <div class="shrink-0">
                                <label for="photos4">
                                    <div class="w-32 h-32 flex items-center justify-center rounded-lg mb-2 text-sm font-medium text-gray-900border border-blue-400 border">
                                        
                                        {#if !imgBlock4}
                                            <svg class="w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M21 15V18H24V20H21V23H19V20H16V18H19V15H21ZM21.0082 3C21.556 3 22 3.44495 22 3.9934L22.0007 13.3417C21.3749 13.1204 20.7015 13 20 13V5H4L4.001 19L13.2929 9.70715C13.6528 9.34604 14.22 9.31823 14.6123 9.62322L14.7065 9.70772L18.2521 13.2586C15.791 14.0069 14 16.2943 14 19C14 19.7015 14.1204 20.3749 14.3417 21.0007L2.9918 21C2.44405 21 2 20.5551 2 20.0066V3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082ZM8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7Z"></path></svg>
                                        {:else}
                                            <img alt=""
                                                class="object-cover w-32 h-32 rounded-lg"
                                                src="{imgBlock4}"
                                            >
                                        {/if}
                                    </div>
                                </label>
                                <input
                                    accept="image/png, image/jpg, image/jpeg"
                                    id="photos4"
                                    type="file"
                                    name="photos4"
                                    bind:value={photos}
                                    class="hidden border text-center text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400"
                                    placeholder="Photos"
                                    on:change={(event) => {console.log(event); imageUploaded(event, 4)}}
                                />
                            </div>
                            <div class="shrink-0">
                                <label for="photos5">
                                    <div class="w-32 h-32 flex items-center justify-center rounded-lg mb-2 text-sm font-medium text-gray-900border border-blue-400 border">
                                        
                                        {#if !imgBlock5}
                                            <svg class="w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M21 15V18H24V20H21V23H19V20H16V18H19V15H21ZM21.0082 3C21.556 3 22 3.44495 22 3.9934L22.0007 13.3417C21.3749 13.1204 20.7015 13 20 13V5H4L4.001 19L13.2929 9.70715C13.6528 9.34604 14.22 9.31823 14.6123 9.62322L14.7065 9.70772L18.2521 13.2586C15.791 14.0069 14 16.2943 14 19C14 19.7015 14.1204 20.3749 14.3417 21.0007L2.9918 21C2.44405 21 2 20.5551 2 20.0066V3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082ZM8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7Z"></path></svg>
                                        {:else}
                                            <img alt=""
                                                class="object-cover w-32 h-32 rounded-lg"
                                                src="{imgBlock5}"
                                            >
                                        {/if}
                                    </div>
                                </label>
                                <input
                                    accept="image/png, image/jpg, image/jpeg"
                                    id="photos5"
                                    type="file"
                                    name="photos5"
                                    bind:value={photos}
                                    class="hidden border text-center text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400"
                                    placeholder="Photos"
                                    on:change={(event) => {console.log(event); imageUploaded(event, 5)}}
                                />
                            </div>
                        </div>
                    </div>
                    
                    {/if}
                    
                    
                <div class="mb-4">
                    <label
                        for="name"
                        class="flex mb-2 text-sm font-medium text-gray-900">
                        Name <p class="text-red-500 ml-1">*</p>
                    </label>
                    <input
                        type="text"
                        name="name"
                        bind:value={name}
                        class="border text-center text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-gray-300 placeholder-gray-400"
                        placeholder="Name"
                        required
                    />
                </div>
                <div class="">
                    <div class="mb-4 flex-grow">
                        <SelectOption
                            title="Category"
                            options={CategoryData}
                            on:change={async (event) => {
                                category = event.detail
                                await loadSubCategories(category)
                            }}
                        />
                        
                    </div>
                
                    <div class="mb-4 flex-grow">
                        <SelectOption
                            title="Sub-Category"
                            options={subCategoryData}
                            value=""
                            on:change={(event) => {
                                subCategory = event.detail
                            }}
                        />
                        
                    </div>
                </div>
                
                <div class="mb-2">
                    <label
                        for="price"
                        class="block mb-2 text-sm font-medium text-gray-900">Price</label
                    >
                    <input
                        type="number"
                        min="0"
                        name="price"
                        bind:value={price}
                        class="border text-center text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-gray-300 placeholder-gray-400"
                        placeholder="Price"   
                        required
                    />
                </div>
                <div class="mb-2">
                    <SelectOption
                        title="Currency"
                        options={[{ id: "USD", name: "USD" }, { id: "KHR", name: "KHR" } ]}
                        value=""
                        on:change={(event) => {
                            currency = event.detail
                        }}
                    />
                </div>
                <div class="mb-2 flex">
                    <CheckBox
                        title={"discount"}
                        on:check={() => {
                            discount = true;
                        }}
                        on:uncheck={() => {
                            discount = false;
                        }}
                    />
                    <div class="mb-2 ml-2 mt-2 flex-grow">
                        <input
                            disabled={!discount}
                            type="number"
                            name="discount"
                            bind:value={discountPrice}
                            class="{!discount?"":""} border text-center text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-gray-300 placeholder-gray-400"
                            placeholder="discount"
                        />
                    </div>
                </div>
                
            </div>
            <button
                disabled={disabledCreate}
                type="submit"
                class="text-white bg-blue-400 hover:bg-blue-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-blue-800"
            >
                Submit
            </button>
        </form>
    </div>
  
    <KLoukdoFooter/>
                         
</div>

