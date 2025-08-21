import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function AddContent({ setContents }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [content, setContent] = useState({
        title: '',
        firstCategory: '',
        secondCategory: '',
        releaseDate: '',
        image: '',
    });
    // const [pImg, setPImg] = useState(null);
    const handleChange = (e) => {
        setContent({
        ...content,
        [e.target.name]: e.target.value,
        });
    }
    const handleAdd = async () => {
        handleClose();
        //이미지 이름 바꾸기
        // const milliseconds = Date.now();
        // console.log(milliseconds);
        // content.image.name = `${milliseconds}_${content.image.name}`;
        //이미지를 서버에 전송
        const formData = new FormData();
        // 'image'는 서버에서 파일을 받을 때 사용하는 키
        formData.append('image', content.image);
        try {
            const response = await fetch('http://localhost:8080/imgUp', {
                method: 'POST',
                body: formData,
            });
            console.log('이미지 업로드 성공:', response);
        } catch (error) {
            console.error('이미지 업로드 실패:', error);
        }
        // content 객체를 서버에 전송
        try {
            //이미지 부분을 주소로 변환
            content.image = content.image.name;
            console.log('콘텐츠 정보:', content);
            const response = await fetch('http://localhost:8080/api/contents', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(content),
            });
            if (response.ok) {
                // 콘텐츠 추가 성공
                console.log('콘텐츠 추가 성공:', await response.json());
                // console.log('콘텐츠 추가 성공:', response);
                // 콘텐츠 목록을 새로고침
                const updatedContents = await fetch('http://localhost:8080/api/contents')
                    .then(response => response.json())
                    .then(data => data._embedded.contents)
                    .catch(error => console.error('Error fetching contents:', error));
                setContents(updatedContents);
                // 콘텐츠 추가 후 초기화
                setContent({
                    title: '',
                    firstCategory: '',
                    secondCategory: '',
                    releaseDate: '',
                    image: '',
                });
            }
        } catch (error) {
            console.error('콘텐츠 추가 실패:', error);
        }

    }
    const changeImage = (e) => {
        // e.preventDefault();
        if(e.target.files[0]){
            // 새로운 이미지를 올리면 createObjectURL()을 통해 생성한 기존 URL을 폐기
            // 이미지 미리보기
            // URL.revokeObjectURL(pImg);
            // const previewImg = URL.createObjectURL(e.target.files[0]);
            // setPImg(previewImg);
            // console.log(e.target.files[0]);
            // content에 이미지 이름을 저장
            setContent({
                ...content,
                image: e.target.files[0],
            });
            
        }
    }
    return (
        <div>
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'flex-end', 
                mb: 2 }}>
                <Button onClick={handleOpen} 
                    sx={{ 
                        fontWeight: 'bold',
                    }}>
                    추가 하기
                </Button>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        콘텐츠 추가
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2, mb: 2 }}>
                        <TextField label="제목" variant="standard" fullWidth name="title" 
                            value={content.title} onChange={handleChange}/>
                        <TextField label="대 분류" variant="standard" fullWidth name="firstCategory" 
                            value={content.firstCategory} onChange={handleChange}/>
                        <TextField label="소 분류" variant="standard" fullWidth name="secondCategory" 
                            value={content.secondCategory} onChange={handleChange}/>
                        <LocalizationProvider dateAdapter={AdapterDayjs} dateFormats={{ monthShort: `M` }}>
                            <DatePicker 
                                format="YYYY-MM-DD"
                                views={['year', 'month', 'day']}
                                value={content.value}
                                onChange={(releaseDate) => {
                                    setContent({
                                        ...content,
                                        releaseDate: releaseDate.format("YYYY-MM-DD"),
                                    });
                                }}
                            />
                        </LocalizationProvider>
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                        >
                            이미지 선택
                            <VisuallyHiddenInput
                                type="file"
                                onChange={(event) =>{
                                    changeImage(event);
                                }}
                                multiple
                                accept="image/*"
                            />
                        </Button>
                        <Typography variant="body2">
                            {content.image.name}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                variant="text"
                                sx={{
                                    fontSize: '1.2em',
                                    fontWeight: 'bold',
                                }}
                                onClick={handleAdd}
                            >
                                추가
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
