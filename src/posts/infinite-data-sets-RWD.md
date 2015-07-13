---
title: Infinite Data Sets and Responsive Web Design
publishDate: 2015-04-27
modifyDate: 2015-04-27
author: Michael Clawson
---

### Summary

Thinking of responsive web design in the same way that we think of infinite data sets results in mobile first responsive web design.

## Intro

So this may seem random, but I was thinking of some articles I've read recently trying to improve my mediocre JavaScript skills. Among them are [JavaScript Training Sucks](https://medium.com/javascript-scene/javascript-training-sucks-284b53666245) and [The Two Pillars of JavaScript](https://medium.com/javascript-scene/the-two-pillars-of-javascript-ee6f3281e7f3) by Eric Elliott. Also numerous articles I read after recently subscribing to [Responsive Design Weekly](http://responsivedesignweekly.com/).

## Infinite Data sets

One of the things that struck me about the second pillar of javascript (according to Elliott), functional programming, is the idea that you can pump infinite data through a pure function because of idempotence. Idempotence is one of the really cool Computer Science concepts that sound really cool and give me nerd-gasms in the classroom but never really took off in application. I feel spikes of satisfaction whenever I find myself using one of the common FP functions such as map/reduce/filter/etc.

## Responsive Web Design

Now one of the things that define me as a human being is my emotions and thinking of the power of pure functions, and the usefulness of the common ones that I've used, I made a leap of intuition. Perhaps I just remembered the feelings of power I felt when reading about mobile first responsive web design, or perhaps I emoted the similarity. But either way, I think it's exciting.

If I think of design in the same way that I think of infinte data sets, I recall that the range of devices and device widths and pixel density that the modern web designer must deal with is practically infinite. Therefore, I can apply the same kind of method for thinking about infinite data sets to scaling my design to all devices.

## Content

A pure function always produces the same output every time given a specific input regardless of external factors, and produces no side effects, just an output. My thought is that in RWD we can think of Content as our input, and the web page as the output.

Therefore, device size and capabilities should not change the content our page exposes. Content reigns supreme. Don't fall into the trap of creating features that distract from the content. The Content should reign supreme at every device width, with every set a capabilities, and should be recognizably the same in every situation.

## Mobile First

Mobile first follows from this directly in my mind because if you have no media queries your content is still just as accessible on any device, at any width, with any capabilities. In my recent designs, wireframes and projects, I have taken starting from a mobile first perspective. I have found that it gives a greater emphasis on content, on what is most important.

The amazing thing is is that this is very freeing. Instead of focusing on getting all the requirements into your design, you just have to do one thing right: get the content on the screen. And then you don't have to worry about desiging for mobile devices, or coding for them. All of a sudden you can handle an infinite variety of devices.

Then, going back the infinite datasets metaphor, you can conditionally add 'filters', additional processing, to your content to add features on desktop and other beefier devices. This keeps the separation of concerns between content and features. It refocuses our attention to the content, and the way that features can improve the content without getting in it's way.

## Conclusion

I'm probably the only person to think of this. It's kind of weird. But I feel that it has helped me get a better grasp of the importance of mobile first in both design and development.

