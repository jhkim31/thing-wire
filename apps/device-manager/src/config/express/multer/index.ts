import multer from 'multer';

const storage = multer.memoryStorage(); // 파일을 메모리에 저장하는 storage 설정
const uploadFileMemory = multer({ storage });

export default uploadFileMemory;