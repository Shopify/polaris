---
name: Patterns/Mobile patterns
slug: mobile-patterns
icon: IconMobile
keywords:
  - gesture
  - swipe
  - long tap
  - long press
  - cell swipe
  - more actions
---

# Mobile patterns

A collection of patterns to help design Shopify’s own iOS and Android apps.

---

## Long tap

### Android

#### List items

Long tap is reserved for multi-select and bulk actions on list items. Long pressing on an item switches the context to a “bulk mode” with contextual actions depending on the type of resource being interacted with. The status of the item will determine what actions are available.

#### Text, images, and other media

For Android, text, images, and other media are often reserved for additional actions or contextual menu items. They can be used together with an overflow action.

Text, images, and other media can also be used to copy, edit, delete, favorite, or move items.

![Android long tap to copy](/public_images/mobile-patterns/long-tap/android-copy@2x.png)

### iOS

#### List items

Not applicable for iOS.

#### Text, images, and other media

Text, images, and other media are often reserved for copying in iOS. The copy function depends on the content (image, text, link, and so on).

![iOS long tap to copy](/public_images/mobile-patterns/long-tap/ios-copy@2x.png)

You can, in a few cases, use long tap for additional actions. For example, to open a new tab, bookmark a page, save an image, or share an item.

---

## Horizontal list item swipe

Use horizontal list item swipe for power user actions that are visually hidden but trained through using other apps and implied through the context of the current screen.

![Android horizontal swipe](/public_images/mobile-patterns/horizontal-swipe/intro@2x.png)

### One directional swipe

The most common swipe pattern is to have one action behind a left-to-right swipe.

#### Single action

Use a single action for list items where there’s a single obvious action.
For example, in an app for making phone calls, the prominent action when swiping a recent call is to delete the call from the list.

![iOS horizontal swipe](/public_images/mobile-patterns/horizontal-swipe/ios-single-action@2x.png)

#### Multiple actions (iOS only)

Use multiple actions for list items that don’t have one obvious action, and/or contain a lot of information. Limit the number of actions to three. If you need more actions you can make the last action “More”. Tapping “More” shows more actions in another way (through using a bottom sheet on Android, and an Action sheet on iOS). For example, an email might need archiving, replying, moving, deleting, or favoriting.

![iOS horizontal swipe with multiple actions](/public_images/mobile-patterns/horizontal-swipe/ios-multiple-actions@2x.png)

### Multi-directional swipe

Multi-direction swipes are standard on Android.

Swiping can be done from either side of the screen. Plus, the different directions can be used for different actions. Multi-direction swipes work best for contradictory actions. For example, archiving/unarchiving, or favoriting/unfavoriting.

![iOS multi-directional swipe actions](/public_images/mobile-patterns/horizontal-swipe/ios-multidirection@2x.png)

### Long swipe

Long swipes are standard on Android, but optional on iOS.

Most iOS swiping gestures have a max length and snap into place based on the label. There’s also the option of a full-item-swipe. After swiping roughly a third of the item width, it’ll automatically snap to the other side, hinting that letting go will commit the action. Swiping back cancels the action.

![Android long horizontal swipe](/public_images/mobile-patterns/horizontal-swipe/android-longswipe@2x.png)

### Content guidelines

Use text labels for actions. Keep labels short. One verb is recommended.

On Android it’s standard to use icons, but we recommend to only use icons that are universally understood for the operating system. For example, favoriting, deleting, and “more” actions.

<!-- usagelist -->

#### Do

- Archive
- Fulfill
- Delete
- ![Delete icon](/public_images/mobile-patterns/horizontal-swipe/delete@2x.png)

#### Don’t

- ![Archive order icon](/public_images/mobile-patterns/horizontal-swipe/archive@2x.png)
- Fulfill items

<!-- end -->

---

## Pull to refresh

![Pull to refresh on iOS](/public_images/mobile-patterns/pull-to-refresh/ios@2x.png)

Pull to refresh is built into Android and iOS.

Use pull to refresh to retrieve the latest data from the server. Add this functionality to screens that don’t automatically retrieve data. It should be standard to use on:

- Any [resource list](/components/lists-and-tables/resource-list)
- A view with time sensitive information
- A view with displaying metrics

---

## Navigation presentations

### Drilling in

Drilling in is a standard navigation presentation on iOS and Android. It’s used for moving down the app’s navigation hierarchy, for example, moving from a [resource list](/components/lists-and-tables/resource-list) to the detail screen. Remember to reverse the navigation when moving back up in the hierarchy.

![Modal on Android and iOS](/public_images/mobile-patterns/navigation/drill-in-large@2x.gif)

### Modal

Modals are used for:

- when the merchant needs to make a decision between saving or discarding changes
- providing detailed information and help on how to continue
- creating or editing a resource (product, collection, customer, and so on)

Read more about [how to write content for modals](/content/actionable-language#section-save-vs-done).

![Modal on Android and iOS](/public_images/mobile-patterns/navigation/modal@2x.png)

### Sheet (Android only)

Sheets are used in Android for adding information while staying in context. Sheets are good for adding additional content and limit the amount of content displayed initially.

Sheet can also contain form elements, like [text fields](https://polaris.shopify.com/components/forms/text-field) or [choice lists](https://polaris.shopify.com/components/forms/choice-list). Make forms short (1-2 form elements), if you need a longer form, use a modal.

![Sheet on Android](/public_images/mobile-patterns/navigation/sheet@2x.png)

---

## Notifications

Many merchants have given Shopify the privilege of sending push notifications by enabling notifications in their settings. We should handle that permission with respect and only send notifications that are worth their time. Remember that each push notification interrupts merchants and forces them to switch contexts.

### Anatomy of notifications

#### Android

![Android notification](/public_images/mobile-patterns/notifications/android@2x.png)

Android notifications contain three areas: header, content, and actions.

**Header area** hosts app icon, app name, header text (optional), timestamp (optional), and expand indicator.

**Content area** hosts image/icon (optional), title, and message.

**Actions area** hosts actions with icons. All actions must provide an icon.

#### iOS

![iOS notification](/public_images/mobile-patterns/notifications/ios@2x.png)

iOS notifications contain two areas: header and content.

**Header area** hosts app icon and app name (controlled by iOS).

**Content area** hosts title, message, and image/icon (optional).

Additionally, you can provide multiple actions and an expanded view of the notification.

### General guidelines

Use these guidelines to design useful, and platform respecting notifications.

<!-- usageblock -->

#### Do

- Provide text if privacy settings are turned on and your message preview is hidden on the lock screen. Instead of saying “Notification”, you might be able to add a preview like “New order” or “Product went out of stock” that provides a hint without any details.
- Use sound to distinguish your app or notification from other apps and types of notifications. For example, the cha-ching sound in the current Shopify app when receiving an order.
- Include an expanded view. On iOS you’re able to 3D touch for more information and on Android you can drag down the notification for more information. You might provide enough information so the merchant doesn’t have to open the app.
- Provide relevant actions for merchants to save time when taking action on the notification. Use short and clear language for actions.
- Clear the notification if the merchant already acted on the notification elsewhere.
- Use badges to communicate the number of items inside the app that need attention. Keep badges up to date in the background if things change somewhere else than on the device.

#### Don’t

- Don’t use push notification for any type of marketing, launch, or encouragement to use a feature.
- Don't send notifications asking for feedback or ratings. For example "Rate our app" or "How are you enjoying X feature?".
- Don’t send “reminding notifications” if merchants haven’t seen or opened the notification. It’ll end up being accessible for later.
- Don’t include the app or product name. The operating system will display the icon and app name together with the notification message.
- Don’t use destructive actions with a notification. There’s a risk for accidental taps or misreading of the information. Instead, leave it up to the merchant to open the app and take action inside of the app.

<!-- end -->

### Content guidelines

Use complete sentences, sentence case, and proper punctuation.

<!-- usagelist -->

#### Do

- [Store name] has a new order for 1 item totaling \$90.11.
- You got mentioned on order #1057 by Andrew.

#### Don’t

- New order: \$90.11 (1 item)
- New mention: Order #1057 (by Andrew)

<!-- end -->

Don't truncate your message (the system does this automatically, if necessary).

<!-- usagelist -->

#### Do

- [Store name] has a new order for 1 item totaling \$90.11.

#### Don’t

- [Store name] has a new order for 1...

<!-- end -->

Don't tell merchants to open your app, navigate to specific screens, tap specific buttons, or perform other tasks that are hard to remember once the notification is dismissed or acted on. Instead, make sure the location the notification leads to provide all actions needed to act on the event.

<!-- usagelist -->

#### Do

- [Store name] has a new order for 1 item totaling \$90.11.

#### Don’t

- Swipe to open the new order totalling \$90.11.

<!-- end -->

---

## Multitasking

### Phone (Android only)

Android has support for phone multitasking. It can be done in both portrait (stacked vertically) and landscape (stacked horizontally) mode.

![Android phone multitasking portrait](/public_images/mobile-patterns/multitasking/android-multi@2x.png)

### Tablet

Both Android and iOS support multitasking. Use layouts that are flexible and responsive to different viewport sizes. Both Android and iOS allow users to drag the size around, so don’t design set viewport sizes.

#### Side-by-side

Side-by-side is the most common mode of multitasking. There are two main sizes: half-half, and one-third.

![iPad slider-over](/public_images/mobile-patterns/multitasking/ipad-side@2x.png)

#### Slider-over

Slider-over is used for quick “check-ins” on content in an app while already using another app. For example, merchants can check emails while using the Shopify app.

![iPad slider-over](/public_images/mobile-patterns/multitasking/ipad-slideover@2x.png)

---

## In-card lists

We can display lists of items inside cards but we must do so carefully. Cards are intended to be concise groupings of related information. There are often multiple cards on the screen so an especially long card will make it harder to access any further content below it. For that reason, we recommend limiting the number of items to 3, 4, or 5. If there are more items in the list, add a “View all” action button that navigates to a dedicated list screen.

![Android phone view more example](/public_images/mobile-patterns/view-more/view-more@2x.png)
