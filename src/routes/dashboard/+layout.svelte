<script>
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import Header from "$components/elements/Header.svelte";
	import MenuButton from "$components/materials/side-menu/MenuButton.svelte";
	import MonitorinMenuButton from "$components/materials/side-menu/MonitorinMenuButton.svelte";
	import SubMenuButton from "$components/materials/side-menu/SubMenuButton.svelte";
	import { ensureSigned } from "$lib/middleware/auth";
	import { onMount } from "svelte";

	let signedIn = false;

	onMount(() => {
		ensureSigned()
			.then(() => {
				signedIn = true;
			})
			.catch(() => {
				goto("/auth");
			});

		console.log($page.route.id);
	});
</script>

{#if signedIn}
	<div class=" flex flex-col relative bg-gray-100 h-screen">
		<div class=" flex-grow-0">
			<Header />
		</div>
		<div class=" relative flex-grow">
			<div class=" absolute inset-0 min-h-[800px]">
				<div class="overflow-y-auto p-2 pt-12 h-screen">
					<main class="flex h-full">
						<div class="w-full lg:flex">
							<div class="mx-auto flex flex-row h-full">
								<!-- menu switch -->
								<div class=" w-56 p-2 hidden lg:block">
									<div class="rounded-md p-1">
										<MonitorinMenuButton
											tailwindClass="font-semibold"
											href="/dashboard"
										/>
										<div class="pl-5">
											<MenuButton
												title="KChannel"
												hasSubMenu
												href="/dashboard/kchannel"
											>
												<SubMenuButton
													title="Profile as admin"
													href="/dashboard/kchannel/profile/as-admin"
												/>
												<SubMenuButton
													title="Profile as audience"
													href="/dashboard/kchannel/profile/as-audience"
												/>
												<SubMenuButton
													title="Setting"
													href="/dashboard/kchannel/setting"
												/>
											</MenuButton>
											<MenuButton
												title="User"
												hasSubMenu={true}
												href="/dashboard/user"
											>
												<SubMenuButton
													title="News Feed"
													href="/dashboard/user/news-feed"
												/>
											</MenuButton>
											<MenuButton title="KTour" href="/dashboard/ktour" />
											<MenuButton title="KMap" href="/dashboard/kmap" />
											<MenuButton title="KLoukdo" href="/dashboard/kloukdo" />
										</div>
									</div>
								</div>

								<!-- tab content -->
								<div class="w-full lg:w-[768px] p-2 h-full">
									<div class="bg-white border rounded-md p-2 h-full w-full">
										<slot />
									</div>
								</div>
							</div>
						</div>
					</main>
				</div>
			</div>
		</div>
	</div>
{/if}
