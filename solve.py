import sys
import heapq
input=sys.stdin.readline

arr=[]

N=int(input())
for _ in range(N):
  X = int(input())
  if X != 0:
    heapq.heappush(arr, -X)
  else:
    print(-heapq.heappop(arr) if len(arr) > 0 else 0)
