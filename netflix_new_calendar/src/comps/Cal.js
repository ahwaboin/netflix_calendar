import { Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/ko'
import './css/Cal.css';
import { useState } from 'react';

moment.locale('ko');
const localizer = momentLocalizer(moment)

// 요일별 스타일 지정 함수
const dayPropGetter = (date) => {
    const day = date.getDay();
    const now = new Date();
    const isCurrentMonth = (date.getMonth() === now.getMonth() && 
        date.getFullYear() === now.getFullYear());
    if (!isCurrentMonth) {
        return { style: { backgroundColor: '#efefefff' } }; // 아주 옅은 회색
    }
    if (day === 0) { // 일요일
        return { style: { backgroundColor: '#ffeaea' } };
    }
    if (day === 6) { // 토요일
        return { style: { backgroundColor: '#eaf3ff' } };
    }
    return {};
};

// 커스텀 툴바 컴포넌트
function CustomToolbar({ onNavigate, date }) {
  // 년.월 형식으로 표시
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const customLabel = `${year}년 ${month}월`;

  // 버튼 스타일: 테두리 없음, 검정색 글씨, 배경 없음, 커서 포인터
  const btnStyle = {
    border: 'none',
    background: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
    padding: '14px 14px',
  };

  // 툴바: 버튼과 제목을 한 줄에 정렬
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        height: '48px',
      }}
    >
      <button
        onClick={() => onNavigate('PREV')}
        style={{ ...btnStyle, marginRight: 16 }}
      >
        &lt;
      </button>
      <div
        style={{
          flex: 1,
          textAlign: 'center',
          fontWeight: 'bold',
        }}
      >
        {customLabel}
      </div>
      <button
        onClick={() => onNavigate('NEXT')}
        style={{ ...btnStyle, marginLeft: 16 }}
      >
        &gt;
      </button>
    </div>
  );
}

function Cal({contents, handleSelectEvent}) {
    const [currentDate, setCurrentDate] = useState(new Date());

    const toEvents = contents.map(content => ({
        id: content.id,
        title: content.title,
        image: content.image,
        firstCategory: content.firstCategory,
        secondCategory: content.secondCategory,
        releaseDate: content.releaseDate,
        start: moment(content.releaseDate).toDate(),
        end: moment(content.releaseDate).toDate(),
        href: content._links.self.href,
    }));

    const handleNavigate = (date) => {
        setCurrentDate(date);
    };

    return(
      <Calendar
          localizer={localizer}
          events={toEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 660,}}
          views={["month"]}
          dayPropGetter={dayPropGetter}
          onNavigate={handleNavigate}
          date={currentDate}
          onSelectEvent={handleSelectEvent}
          components={{toolbar: CustomToolbar}}
      />
    );
}
export default Cal;