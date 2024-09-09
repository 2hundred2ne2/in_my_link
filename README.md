# in_my_link

## 커밋 컨벤션

```
type: message #issue
```

### 커밋 타입

```
chore        패키지 매니저, 설정 변경 등
ci           CI 파일 수정
comment      주석
docs         문서 내용 추가 및 수정
typo         오타 수정
feat         기능 추가
fix          버그 수정
perf         성능 개선
refactor     코드의 동작을 변경하지 않고 구조를 개선한 코드 리팩토링, 파일/폴더명 수정 또는 이동
remove       파일 삭제
revert       커밋한 내용을 되돌림
style        코드 포맷 변경, 세미 콜론
test         테스트 추가 및 수정
ui           UI 변경
```

## 환경 변수

로컬 환경에서 환경 변수를 설정하려면 다음 단계를 따라주세요:

1. `.env.example` 파일을 `.env.local` 새 파일로 복사

```bash
cp .env.example .env.local
```

2. `.env.local` 파일을 열어 실제 설정 값으로 바꾸기

> [!NOTE]
> MySQL 8을 사용하고있어요

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=username
DB_PASSWORD=password
DB_NAME=name
```

### 실행

환경 변수 설정후 다음 명령어로 프로젝트를 시작해요:

```bash
npm install
npm run dev
```
