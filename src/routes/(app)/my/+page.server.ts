import { OrdersService, ReviewService, WishlistService } from '$lib/services'
import { redirect } from '@sveltejs/kit'

export async function load({ request, locals, parent, cookies }) {
	const { me, store } = locals
	try {
		const myOrders = await OrdersService.fetchOrders({
			storeId: locals.store?.id,
			server: true,
			sid: cookies.get('connect.sid')
		})
		const myWishlist = await WishlistService.fetchWishlist({
			storeId: locals.store?.id,
			server: true,
			sid: cookies.get('connect.sid')
		})
		const myReviews = await ReviewService.fetchReviews({
			storeId: locals.store?.id,
			server: true,
			sid: cookies.get('connect.sid')
		})
		return { me: me, myOrders, myWishlist, myReviews }
	} catch (e) {
		if (e.status === 401) {
			throw redirect(307, locals.store?.loginUrl)
		}
	}
}
