import { BannersService } from '$lib/services'
import { error } from '@sveltejs/kit'
export const prerender = false

export async function load({ parent, url, locals, params, cookies }) {
	try {
		const banners = await BannersService.fetchBanners({
			pageId: params.slug,
			storeId: locals.store?.id,
			server: true,
			sid: cookies.get('connect.sid')
		})
		const groupByBanners = await BannersService.fetchBannersGroup({
			pageId: params.slug,
			storeId: locals.store?.id,
			server: true,
			sid: cookies.get('connect.sid')
		})

		if (banners || groupByBanners) {
			return { banners, groupByBanners }
		}
	} catch (e) {
		throw error(400, e?.message || e)
	}
}
