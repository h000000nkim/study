
## 1. 공분산의 정의

- 이미 공분산의 정의는 알고 있음 : 두 변수가 함께 변화하는 정도임 (나중에 상세설명 추가)
	 $Cov(X,Y)=E[(X−E[X])(Y−E[Y])]$ 
- 공분산의 정의를 전개하면
	$Cov(X,Y)=E[(X−E[X])(Y−E[Y])]=\textbf{E[XY]−E[X]E[Y]}$ 
	즉 공분산은 두변수의 곱의 평균에서 평균의 곱을 뺀것으로 생각하면 된다.

## 2. 공분산의 성질

- 공분산의 선형성
	- 결론 : $Cov(aX+bY,Z)=aCov(X,Z)+bCov(Y,Z)$ 
	- 유도
		$Cov(aX+bY,Z)=E[(aX+bY)Z]−E[aX+bY]E[Z]$
		$=aE[XZ]+bE[YZ]−(aE[X]+bE[Y])E[Z]$
		$=a(E[XZ]−E[X]E[Z])+b(E[YZ]−E[Y]E[Z]) =a Cov(X,Z)+b Cov(Y,Z)$ 
		$= a \, \mathrm{Cov}(X,Z) + b \, \mathrm{Cov}(Y,Z)=aCov(X,Z)+bCov(Y,Z)$$ 
- 공분산의 대칭성
- 자기 자신과의 공분산
- 상수와의 공분산
- 
