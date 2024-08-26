# in_my_link

### 환경 변수

로컬 환경에서 환경 변수를 설정하려면 다음 단계를 따라주세요:

1. `.env.example` 파일을 `.env.local` 새 파일로 복사

```bash
cp .env.example .env.local
```

2. `.env.local` 파일을 열어 실제 설정 값으로 바꾸기

> [!NOTE]
> MySQL을 사용하고있어요

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
