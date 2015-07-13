---
title: Asynchronous Loading of Bazaar Voice Conversations
publishDate: 2015-05-30
modifyDate: 2015-05-30
author: Michael Clawson
---

### Summary

Loading Bazaar Voice's Ratings and Reviews and Question and Answers asynchronously improved perceived performance on our product page (as measured by DOMContentLoaded) by ~200ms.

## Introduction

Our product page has recently garnered some attention in how it handles out of stock products. Since we load all variations of a product on the product page, variations and their stock status is handled by javascript. It took me quite by surprise that the Out of Stock message took ~1.2 seconds to appear on a nice computer. I wrote that code which just goes to show that if you don't hate the code you wrote 6 months ago you're not progressing as a developer. After hours (ahem) of pouring over network waterfall diagrams in Chrome, it was obvious that there was more than one mess to clean up here.

We use requirejs to load our client side javascript asynchronously. But so many things were happening before render on this page that requirejs doesn't start loading our javascript until about 800ms, and it has to go through 3 rounds of downloading dependencies before it can bootstrap our javascript code.

Obviously, for our product page this is not ideal. Parts of our javascript are required for the page to function, and parts are required for them to be able to add the product to cart. So long term solution will mean refactoring critical path javascript out and rewriting it to not depend on jQuery, and loading it with the page. Since we are hoping to rework our products functionality and design this summer that didn't seem like a good place to spend my time optimizing. So I looked at other things, hoping to decrease time to DOMContentLoaded.

## Fonts

At first it seemed that our fonts were blocking rendering. Some were downloading at <150ms, and some were downloading at ~300ms. Chrome was reporting bogus initiators for our fonts. It claimed either modernize, or some random line in the HTML, while the truth of it is the only place they are called is in our main css file.

I was operating a little blindly so I decided to try a quick experiement. I loaded the fonts in an inline style tag in the header. But there was no difference. I tried a few other pages, both with the change and without the change, and there was also no change. Moreover, the fonts that were downloading later (300+ ms) were not blocking page render. On most other pages only one font downloaded before DOMContentLoaded. So time to scratch that approach.

## BazaarVoice

This was pointed out to me as a possible cause by the bug reporter. We have implemented BazaarVoice's Conversations product: Ratings and Reviews, and Questions and Answers which are then syndicated to retailers websites as well as displayed our own. The problem is that their documentation sucks and we followed it. Their widgets were loading with the page, synchronously. Their initial script loaded two other scripts (one of which was a 1 MB javascript file) and a css file. It appeared that their css file was blocking page render, but after my fiasco with the fonts I'm not as confident, but surely that 1 MB of javascript was slowing the browser down just by parsing it.

So I read up on some articles on loading scripts asynchronously. And chose to use the async attribute on the script tag rather than trying to insert the script tag with javascript which is now considered bad practice. I toyed with the idea of inserting the BazaarVoice javascript from our requirejs loaded javascript, but I figured that would increase the users perception of the page load time because content would be loading for longer.

What I did move to our require js loaded javascript was the calls to BazaarVoice's javascript API to instantiate the widgets. This works because they depended on a hardcoded element id, so the instantiation code's position doesn't matter.

## Results

I tested my solution on several page loads in my dev environment and on our staging environment and found that DOMContentLoaded occurred between 180-250ms sooner than it did on production in my side by side comparisons. The page now takes longer to fully load, but in the spirit of progressive enhancement it's unnecessary features that are extending it.

But what about our require js loaded javascript that is necessary for the page to function? It is also loaded much sooner. It is much more variable in how long it takes to load all three rounds of dependencies, but with DOMContentLoaded occuring sooner it starts sooner.

I will update this with more results once this code goes live next week.
