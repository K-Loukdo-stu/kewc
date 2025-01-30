<script>
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
    let imageJson = {};
    let originalImage;
    // let height;
    // let width;
    // let size;
    let disabledCreate = false;
    
    let CategoryData;
    let subCategoryData;
    let category;
    let subCategory;
    let currency;

    const createdService = async (evt) => {
        evt.preventDefault();

        let allUploadedImage = [];
        allImage.forEach(async (element) => {
            console.log({element})
            let image = await uploadImage.load({
            height: element.height, name: element.name, size: element.size, width: element.width, base64: element.base64
            });
            console.log({image})
            console.log(element)
            let image = {
                bucket: "kstorage-bucket",
                contentType: "image/jpeg",
                height: 600,
                width: 900,
                key: "image/6799d220ff9de4097411416f",
                thumbnail: {url: "http://kradass.com/kstorage/common/stream/image/6799d220ff9de4097411416f", width: 100, height: 99},
                url: "http://kradass.com/kstorage/common/stream/image/6799d220ff9de4097411416f"
            };
            allUploadedImage.push(image);
            // allUploadedImage.
        });
        console.log({allUploadedImage})
        let res = await createKLoukdoProduct.load({
            name, category, subCategory, price, discountPrice, hasDiscount:discount, currency, photos:allUploadedImage
        });
        if (res.success) disabledCreate = true;
      };


    var imageUploaded = function(event) {
        loadFile(event)
        const file = event.target.files[0]; // Get the first file from the file input
        originalImage = file;
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
        allImage[0] = imageJson;
        console.log({allImage})
    }

    var loadFile = function(event) {
        var image = document.getElementById('output');
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


<div class=" h-screen relative">
    <KLoukdoHeader
        goBack={true}
    />
                
        <div class="py-6 px-2 lg:px-8">
            <form
                class="space-y-6 w-full h-full flex flex-col"
                on:submit|preventDefault={createdService}
                method="post"
            >
                <div class="text-xl font-medium text-black text-center">
                    Create A Product
                </div>
                <div class="">
                    <div class="mb-2">
                        <div class="block mb-2 text-sm font-medium text-gray-900">Photos</div>
                        <label for="photos">
                            <div class=" rounded-lg block mb-2 text-sm font-medium text-gray-900 w-full border border-blue-400">
                                <img alt="" id="output"
                                    class="w-full object-cover h-40 rounded-lg"
                                    src=""
                                >
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
                            on:change={imageUploaded}
                        />
                    </div>
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

