---
layout: "../../layouts/BlogLayout.astro"
title: DSA Dictionary
description: Making a dictionary to help me learn DSA better
---

## Heap (Priority Queue)
- A binary tree where all items in the left branch and the right branch are greater than or equal to their parent
  - This property is recursive, so any given node should be less than their parent node
- All rows must be completely full except for the last one 
- Can be min heap or max heap
- Represented as a binary tree but works as an array most of the time under the hood
  - left child index = `i * 2`
  - right child index = `(i * 2) + 1`
  - parent index = `i / 2`
- **Time Complexity Properties**
  - Creating a heap takes `O(n)` time
  - Removing an item takes `O(log(n))` time
  - Gets min/max in `O(1)` time
- **Useful situations**
  - When you need to know the min/max in an array while continually adding items to that array
  - When you only need the first x smallest/largest terms in an array OR the xth smallest term in an aray
    - Takes complexity from `n*log(n)` (sorting) to `x*log(n)`


##  Map
 - A set of unique items (usually numbers)
 - Similar to a set, but has a key-value pair instead of just a value
 - **Time Complexity Properties**
 - Insert `O(1)`
 - Remove `O(1)`
 - Search `O(1)`
 - **Useful situations**
 - Finding items quickly
 - **Downsides**
 - Not sorted

## Set
 - A set of unique items (usually numbers)
 - Similar to a map, but only has a value instead of being a key-value pari
 - **Time Complexity Properties**
 - Insert `O(1)`
 - Remove `O(1)`
 - Search `O(1)`
 - **Useful situations**
 - Finding items quickly
 - **Downsides**
 - Not sorted