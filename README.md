# F1 live data webapp
This webapp is an experimental app build using node, express and ejs to display formula 1 driver data during a race. The data can be changed from an admin page and the result on an overview page. When data is changed on the admin page it will dynamically change on the other page.

## Instructions (How to use)

- Download or clone the repository
- Navigate to the right folder in the terminal using cd
- Install using: npm install
- Start a server with npm start


# EXTRA, Break the Web
For this excersize i will research 2 web features to see what happens when you disable them. The two features are:
1. Images
2. Mouse/trackpad

## Images
Images are an important part of most websites, they allow us to add visual context to any content. But what if someone disables images in their browser?
<br />
<br />

<!-- ![spacex-comparison](img/spacex-imagecomparison.gif "spacex comparison") -->

### WHY?!
Why would someone disable images on the internet to begin with? People could be blocking images for different reasons, for example:
* People with visual impairments use non-visual browsers, these browsers use screen readers to read the content aloud. Images are useless in this context and are not displayed.
* Some people choose to block images in the settings of their browser. This could be because they want to save bandwidth (images are quite large and can slow down loading time), or for privacy reasons.
<br />
<br />

### How?
Disabling images is actually quite easy.
* For chromium based browsers (chrome, brave etc.) click on the three dots in the top right, then settings > privacy & security > site settings, and under images switch to "do not show any images". The browser will now try to filter out all images.
<br />
<br />

![Disable-images](img/disable-images.png "settings > disable images")
<br />
<br />
<br />

* For Safari, go to preferences in the top menu > click Appearance > uncheck "display images"

* For Firefox type about:config in the search bar, search for this option "permissions.default.image" change it to 2.

    Possible values:

    1 -- Always load the images

    2 -- Never load the images

    3 -- Don't load third images
<br />
<br />

### Dealing with disabled/blocked images
There is not a lot you can do about the user blocking images. But if the image is an important piece of content for the website the information in the image should be accessible in another way.

* Not using an alt tag at all tells the browser the image is a key part of the website and there is no textual equivalent available. In this case it might be wise to find another way present the information the image is trying to show.
* Using an empty alt tag (alt="") means the image is not a key part of the content. Screen readers will ignore the image and not mention it.
    
    **Also, if the image tag is empty the browser will not show the broken image icon!*

* The description in an alt tag should be clear and detailed.
<br />
<br />

![alt-description](img/image-description.png "image alt description")
<br />
<br />

## Mouse/trackpad
The mouse or trackpad is an important part of the web, a lot of people use one of these tools to move their cursor. But some people don's use a mouse or trackpad, so what if you can't navigate using these tools?
<br />
<br />

![youtube-tabbing](img/youtube-tabbing.png "using tab in youtube")
<br />
<br />
Here i used tab to navigate trough youtube. It is not ideal but they clearly thought about people using tab. You start in the top left and tab trough the top elements. Once you pass the youtube logo a "skip navigation" button appears, this immediatly sends you to the sidebar. Youtube has a lot of clickable components on the website so alot of tabbing is required but it seems youtube included everything as an element that can be tabbed.
<br />
<br />

### WHY?!
There could be a lot of reasons for not using a mouse or trackpad, the user could be injured and unable to use a mouse or does not want to use a mouse for too long because of ergonomic reasons. Other reasons could be a broken mouse or broken trackpad or the mouse could be unavailable because of the place the device is being used. The user should still be able to browse the web without mouse or trackpad.
<br />
<br />

### How?
This experiment is super simple, just don't use the mouse or trackpad! (it is very difficult to not touch it out of habit though...)
<br />
<br />

### Dealing with users who don't have a mouse/trackpad
When a mouse or trackpad is not available, using tab to navigate trough a webpage is the best alternative. By default certain interactive html elements get marked as elements that can be tabbed trough. Examples of elements that can be tabbed trough by default are links (\<a>\), text fields, checkboxes etc.  

You can make any html element interactive by using tabindex or javascript.

* Before using tabindex you have to make sure the element is interactive. Giving a regular div tabindex could be confusing for users, make sure to make the div interactive with keyboard events for example.

* tabindex=0 will make an element focusable, it will act like the other default interactive elements.

* You can use tabindex to make a focus order by giving it positive values. Tabindex=1 will push the element forward and show first, then tabindex=2 etc. It is advised to not use this method to create a focus order, it is much better to create a natural order by setting focusable in the right order in your html. This way the focus will work right naturally.

* You can change the way a focused element looks with the :focus style. All browsers have their own default style for focused objects so if you want it to be consistent this is the only way.

https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_WCAG/Keyboard
