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

## Map

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
- Finding items **quickly**
- **Downsides**
- Not sorted

## Graphs

- Made up of Edges and Vertices
  - `e <= v^2`
- Directed vs Undirected
  - Directed - edges go one way
  - Undirected - edges go both ways
- **3 Types**
  1. Matrix (Grid)
     - Undirected edges
  2. Adjacency Matrix
     - Not common
     - Represented as a grid
     - 0/1 at a value [x,y] means there is/is not a path between vertex x and vertex y
     - 0 = no path, 1 = path
     - Directed
  3. Adjacency List
     - Vertex has value and neighbors
     - Neighbors are vertices that a vertex connects to (does not include vertices that connect to it)
     - Directed
     - Good for looking at dependencies (imports, class schedules, etc.)

## Matrix DFS

- Depth First Search for a grid
- **Time Complexity Properties**
  - `O(4^nm)` or `O(8^nm)` (if diagonal movements are allowed)
- **Useful Situations**
  - Count number of unique paths in matrix
  - Count islands

## Matrix BFS

- Breadth First Search for a grid
- Way faster than DFS
- **Time Complexity Properties**
  - `O(nm)`
- **Useful Situations**
  - Shortest path in matrix

## Bit Operations

- AND - `&` - checks if both of the last bit of two numbers is 1
- OR - `|` - checks if one of the last bits of two numbers is 1
- XOR - `^` - checks if one and only one of the last bits of two numbers is 1
- NOT - `~` - negates - flips all the bits and negates the number
- Shift Left - `<<` - shifts all bits to the left
  - Same as multiplying by 2
- Shift Right - `>>` - shifts all bits to the right (losest the right most bit)
  - The equivalent of dividing by 2 and rounding down to the nearest whole number

## Trie (Prefix Tree)

- Used for strings of characters
- **Time Complexity Propterties**
  - Insert Word: O(m)
  - Search Word: O(m)
  - Search Prefix: O(m)
  - Where m is the length of the word

## Dijkstra's Algorithm

- Used for finding shortest distance in a weighted graph/adjacency list
- How?
  - The basic idea is that you always take the shortest path in the nodes you've already visited.
  - Like BFS, but instead of using a queue, you use a min heap. After each iteration, instead of going through an entire queue, you just process the next item in the min heap.
    - This guarantees that the first time you reach an item you've gotten there the fastest way possible.
- **Time Complexity Properties**
  - `O(E * log(E))` OR `O(E * log(V))`
    - There the same when you break it down mathematically
    - Where E is the number of edges and V is the number of vertices

## Prim's Algorithm

- Used for finding the shortest path between all points in a graph without creating a cycle (minimum spanning tree)
- You shouled end up with n - 1 edges
- How?
  - Same as Dijkstra's Algorithm, but:
    - You don't need to store distance results, you just need to store if you've visited a node (set)
    - You also need to build the path (minimum spanning tree) as you go through
- **Time Complexity Properties**
  - `O(E * log(E))` OR `O(E * log(V))`
    - There the same when you break it down mathematically
    - Where E is the number of edges and V is the number of vertices

## Kruskal's Algorithm

- Used for finding the shortest path between all points in a graph without creating a cycle (minimum spanning tree)
- How?
  - Store all the edges in a min heap
  - Pop from the heap until you finished building the mst (length of mst will be number of vertices - 1)
  - Every time you pop from the heap, use union find to figure out if adding it to the mst will cause a cycle
  - If it doesn't cause a cycle, add the edges to the mst
- **Time Complexity Properties**
  - `O(E * log(E))` OR `O(E * log(V))`
    - There the same when you break it down mathematically
    - Where E is the number of edges and V is the number of vertices

## Bellman Ford Algorithm

- Like Dijkstra's it's also used for finding the shortest distance in a weighted graph/adjacency list
  - Can be used to handle graphs with negatives weights (Dijkstra's doesn't work with negative weights)
  - Can be used to find out the shortest distance in x steps
  - It's slower than Dijkstra's so only use when Dijkstra's doesn't work
- How?
  - You run BFS on the graph x times
  - Instead of writing results to a single array or results, you write to a copy after each iteration
    - This is basically the secret sauce to Bellman Ford that allows you to find the shortest distance to a node in x steps
- **Time Complexity Properties**
  - `O(E*V)`

## Hierholzer's Algorithm

- Used for finding the Eulerian Path (a path that visits every edge once and only once)
- How?
  - Build an adjacency list of the nodes
  - Pick a starting node
    - There should be either 0 odd-degree vertices (loop) or 2 odd-degree vertices (graph with 2 ends)
    - If 0 odd-degree vertices, pick any node.
    - If 2 odd-degree vertices pick either of the 2.
  - Add the starting node to a stack
  - Run while loop
    - If the current node on top of the stack doesn't have any more edges, append it to the result
    - If the current node has more edges, add one to the stack
  - Return the reversed order of the array to get the right order
- **Time Complexity Properties**
  - `O(E*log(E))`
