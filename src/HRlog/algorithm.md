## 快排
::: tip
简单的很
:::


```c
int Partition(int a[],s,t){
	int i=s,j=t;
	int tmp = a[s];
	while(i!=j){
		while(j>i&&a[j]>=tmp){
			j--;
		}
		a[i] = a[j];
		while(i<j&&i<=tmp){
			i++;
		}
		a[j] = a[i];
	}
	a[i] = tmp;
	return i;
}

void Quick(int a[],s,t){
	 if(s<t){
	 	int i = Partition(a,s,t);
	 	Quick(a,i+1,t);
	 	Quick(a,s,i-1);
	 }
}

int main(){
	int n = 9;
	a[] = {2,4,6,3,9,7,1,5,8};
	Quick(a,0,n-1);
}

```

## 最大子序列和

```c
int MaxSum(int a[],int n){
	int i,j,k;
	int maxSum = 0,thisSum = 0;
	for(i=0;i<n;i++){
		for(j=0;j<n;j++){
			thisSum = 0;
			for(k=i,i<=j,k++)
				thisSum+=a[k];
			if(thisSum>=maxSum)
				maxSum = thisSum;
		}
	}
	return maxSum;
}

void main(){
	int a[];
	n = sizeof(a)/sizeof(a[0]);
	MaxSum(a,n);
}
```



## 最长公共子序列

```c
int m,n;
string a,b;
int dp[100][100];
char subs[];

void LCS(){
	int i,j;
	for(i=0;i<m;i++)
		dp[i][0] = 0;
	for(j=0;j<n;j++)
		dp[0][j] = 0;
	for(i=1;i<m;i++){
		for(j=1;j<n;j++){
			if(a[i-1]==a[j-1]){
				dp[i][j] = dp[i-1][j-1]+1;
			}else{
				dp[i][j] = MAX(dp[i-1][j],dp[i][j-1]);
			}
		}
	}
}

void Buildsubs(){
	int i=m,j=n;
	int k=dp[i][j];
	while(k>0){
		if(dp[i][j]==dp[i][j-1]){
			j--;
		}else if(dp[i][j]==dp[i-1][j]){
			i--;
		}else{
			subs = a[i-1]
			i--,j--,k--;
		}
	}
}

int main(){
	a='abcbdb';
	b='acbbabdbb';
	n = sizeof(a)/sizeof(a[0]);
	m = sizeof(b)/sizeof(b[0]);
	LCS();
	Buildsubs();
	printf("%s",subs);
}
```

## n皇后

```c
棋子不能在同一行同一列同一对角线

bool place(int i){
	int j = 1;
	if(i==1) return true;	//若为第一个皇后，直接返回
	while(j<i){
		//判断是否同列、通对角线
		if((q[j]==q[i])|| (abs(q[j]-q[i])==abs(j-i)))
			return false;
		j++;
	}
	return true;
}

void Queens(int n){
	int i=1;	//第1行开始，放第1个皇后
	q[i]=0;		//初始都从第0列开始放皇后
	while(i>=1){	//当未回溯到第一个皇后时
		q[i]++;		//开始往后一列放置皇后
		//如果该未遍历超出棋盘，切位置不能放置
		while(q[i]<=n && !place(i))
			q[i]++；	//继续后移
		//如果能放置
		if(q[i]<=n){
			if(i==n){	//如果遍历完最后一行，则输出当前能放入最多皇后的结果
				dispasolution（n）;
			}else{
				i++;
				q[i]=0;	//每个新皇后再次从0列开始
			}
		else i--;	//如果当前皇后找不到，回溯到上一个重新移动寻找位置
				
		}
	}
}

void main(){
	int n;
	scanf("%d",&n);
	Queens(n);
}
```