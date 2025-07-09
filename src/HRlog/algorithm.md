# 算法学习笔记

这是一份关于基础算法的学习笔记，记录了包括快速排序、最大子序列和、最长公共子序列以及N皇后问题的核心思想和代码实现。

## 快速排序 (Quick Sort)

快速排序是一种非常高效的、基于“分治”思想的排序算法。它在平均情况下的表现非常出色，是实际应用中最常用的排序算法之一。

::: tip 核心思想
1.  **选择基准 (Pivot):** 从数组中选择一个元素作为“基准”。
2.  **分区 (Partition):** 重新排列数组，将所有小于基准的元素移动到基准的左边，所有大于基准的元素移动到基准的右边。在这个过程结束后，基准元素就处于其最终的排序位置。
3.  **递归 (Recursion):** 对基准左右两边的子数组重复以上过程，直到所有子数组都只有一个元素，排序完成。
:::

**时间复杂度:**
*   **平均情况:** O(n log n)
*   **最坏情况:** O(n²) (当数组已经有序或接近有序时，每次选择的基准都导致分区极不平衡)

**空间复杂度:** O(log n) (主要来自递归调用栈的深度)

```c
#include <stdio.h>

// 分区函数，返回基准元素的最终位置
int Partition(int a[], int s, int t) {
    int i = s, j = t;
    int tmp = a[s]; // 选择第一个元素作为基准
    while (i != j) {
        // 从右向左找第一个小于基准的数
        while (j > i && a[j] >= tmp) {
            j--;
        }
        a[i] = a[j];
        // 从左向右找第一个大于等于基准的数
        while (i < j && a[i] <= tmp) {
            i++;
        }
        a[j] = a[i];
    }
    a[i] = tmp; // 将基准元素放到它的最终位置
    return i;
}

// 快速排序递归函数
void QuickSort(int a[], int s, int t) {
    if (s < t) {
        int i = Partition(a, s, t);
        QuickSort(a, s, i - 1); // 递归排序左半部分
        QuickSort(a, i + 1, t); // 递归排序右半部分
    }
}

int main() {
    int a[] = {2, 4, 6, 3, 9, 7, 1, 5, 8};
    int n = sizeof(a) / sizeof(a[0]);
    QuickSort(a, 0, n - 1);
    
    printf("Sorted array: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", a[i]);
    }
    printf("\n");
    return 0;
}
```

## 最大子序列和 (Maximum Subsequence Sum)

最大子序列和问题旨在找到一个一维数组中，连续子数组的和的最大值。

::: tip 算法思想 (暴力解法)
这是一种最直接的解法，通过三重循环来枚举所有可能的连续子数组，并计算它们的和，然后找出其中的最大值。
1.  第一层循环 `i` 固定子数组的起始位置。
2.  第二层循环 `j` 固定子数组的结束位置。
3.  第三层循环 `k` 从 `i` 到 `j` 遍历子数组，计算其和。
4.  比较当前子数组的和与已知的最大和，并更新最大和。
:::

**时间复杂度:** O(n³) (三重循环导致)
**空间复杂度:** O(1)

> **注意:** 这是一个效率较低的实现。更优的解法包括O(n²)的解法（去掉第三层循环）和O(n)的动态规划解法（Kadane算法）。

```c
#include <stdio.h>
#include <limits.h>

// 返回a数组中n个元素的最大子序列和
int MaxSum(int a[], int n) {
    int i, j, k;
    int maxSum = 0; // 如果允许子序列和为负，可以初始化为 INT_MIN
    for (i = 0; i < n; i++) {
        for (j = i; j < n; j++) {
            int thisSum = 0;
            // 计算从 a[i] 到 a[j] 的和
            for (k = i; k <= j; k++) {
                thisSum += a[k];
            }
            if (thisSum > maxSum) {
                maxSum = thisSum;
            }
        }
    }
    return maxSum;
}

int main() {
    int a[] = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
    int n = sizeof(a) / sizeof(a[0]);
    int result = MaxSum(a, n);
    printf("The maximum subsequence sum is: %d\n", result); // 应该输出 6 (来自 4, -1, 2, 1)
    return 0;
}
```

## 最长公共子序列 (Longest Common Subsequence - LCS)

最长公共子序列问题是寻找两个给定序列的子序列中，长度最长的那个公共子序列。子序列不需要是连续的。

::: tip 算法思想 (动态规划)
使用一个二维数组 `dp[m+1][n+1]` 来存储中间结果，其中 `dp[i][j]` 表示字符串 `a` 的前 `i` 个字符和字符串 `b` 的前 `j` 个字符的最长公共子序列的长度。
-   **状态转移方程:**
    -   如果 `a[i-1] == b[j-1]`，那么 `dp[i][j] = dp[i-1][j-1] + 1`。
    -   如果 `a[i-1] != b[j-1]`，那么 `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`，取两者中的较大值。
-   **构造子序列:** 从 `dp[m][n]` 开始回溯，根据 `dp` 表的值反向推导出LCS。
:::

**时间复杂度:** O(m*n) (m和n是两个字符串的长度)
**空间复杂度:** O(m*n) (用于存储dp表)

```c
#include <stdio.h>
#include <string.h>

#define MAX(a, b) ((a) > (b) ? (a) : (b))

void LCS(const char* a, const char* b, int m, int n, int dp[][n+1]) {
    for (int i = 0; i <= m; i++) {
        for (int j = 0; j <= n; j++) {
            if (i == 0 || j == 0) {
                dp[i][j] = 0;
            } else if (a[i - 1] == b[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = MAX(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
}

void BuildSubs(const char* a, int m, int n, int dp[][n+1], char* subs) {
    int i = m, j = n;
    int k = dp[m][n];
    subs[k] = '\0'; // 字符串结束符
    k--;

    while (k >= 0 && i > 0 && j > 0) {
        if (dp[i][j] == dp[i][j - 1]) {
            j--;
        } else if (dp[i][j] == dp[i - 1][j]) {
            i--;
        } else {
            subs[k] = a[i - 1];
            i--, j--, k--;
        }
    }
}

int main() {
    char a[] = "abcbdb";
    char b[] = "acbbabdbb";
    int m = strlen(a);
    int n = strlen(b);
    int dp[m + 1][n + 1];
    
    LCS(a, b, m, n, dp);
    
    int lcs_len = dp[m][n];
    char subs[lcs_len + 1];
    BuildSubs(a, m, n, dp, subs);
    
    printf("LCS length is: %d\n", lcs_len);
    printf("LCS is: %s\n", subs); // 应该输出 "abbdb"
    return 0;
}
```

## N皇后问题 (N-Queens)

N皇后问题要求在一个 N×N 的棋盘上放置 N 个皇后，使得它们不能互相攻击（即任何两个皇后都不能处于同一行、同一列或同一对角线上）。

::: tip 算法思想 (回溯法)
回溯法是一种试探性的搜索算法，当发现当前选择的路径无法达到目标时，就退回上一步，尝试其他选择。
1.  从第一行开始，尝试在第一行的第一列放置一个皇后。
2.  检查当前位置是否安全（不与已放置的皇后冲突）。
3.  如果安全，则递归到下一行，继续放置下一个皇后。
4.  如果不安全，或者从下一行的递归返回（表示下一行找不到合适位置），则将当前皇后移动到本行的下一列，继续尝试。
5.  如果本行的所有列都已尝试过但都无法成功，则回溯到上一行，调整上一行皇后的位置。
6.  当成功在最后一行放置皇后时，就找到了一个解。
:::

**时间复杂度:** 很难精确计算，大致为 O(N!)
**空间复杂度:** O(N) (用于存储皇后位置和递归栈)

```c
#include <stdio.h>
#include <stdbool.h>
#include <stdlib.h>

int q[100]; // q[i] 表示第 i 行的皇后放在第 q[i] 列
int count = 0;

void displaySolution(int n) {
    printf("Solution %d: ", ++count);
    for (int i = 1; i <= n; i++) {
        printf("%d ", q[i]);
    }
    printf("\n");
}

// 检查第 i 行的皇后放置位置是否安全
bool isSafe(int i) {
    if (i == 1) return true; // 第一个皇后总是安全的
    for (int j = 1; j < i; j++) {
        // 判断是否同列或同对角线
        if ((q[j] == q[i]) || (abs(q[j] - q[i]) == abs(j - i))) {
            return false;
        }
    }
    return true;
}

// n皇后主函数
void Queens(int n) {
    int i = 1;  // 从第1行开始
    q[i] = 0;   // 第i行的皇后初始放在第0列（哨兵）
    while (i >= 1) {
        q[i]++; // 将第i行的皇后向后移动一列
        // 如果未超出棋盘且当前位置不安全，继续后移
        while (q[i] <= n && !isSafe(i)) {
            q[i]++;
        }
        
        if (q[i] <= n) { // 找到了一个安全位置
            if (i == n) { // 如果是最后一行，输出一个解
                displaySolution(n);
            } else {
                i++;      // 继续下一行
                q[i] = 0; // 新皇后的列从0开始
            }
        } else { // 如果当前行所有列都试过，回溯
            i--;
        }
    }
}

int main() {
    int n;
    printf("Enter the number of queens (N): ");
    scanf("%d", &n);
    if (n > 0 && n < 100) {
        Queens(n);
    } else {
        printf("N must be between 1 and 99.\n");
    }
    return 0;
}
```
```