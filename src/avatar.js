import lawyerAvatarUrl   from "./assets/avatar-lawyer.png"
import salesAvatarUrl    from "./assets/avatar-sales.png"
import customerAvatarUrl from "./assets/avatar-customer.png"

function avatarUrl(type) {
  switch(type) {
    case "lawyer":   return lawyerAvatarUrl
    case "sales":    return salesAvatarUrl
    case "customer": return customerAvatarUrl
  }
}

avatarUrl.lawyer   = lawyerAvatarUrl
avatarUrl.sales    = salesAvatarUrl
avatarUrl.customer = customerAvatarUrl

export {
  lawyerAvatarUrl,
  salesAvatarUrl,
  customerAvatarUrl,
  avatarUrl
}
