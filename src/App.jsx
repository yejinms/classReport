import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Star, Sparkle, BookOpen, Target, MessageCircle } from 'lucide-react';
import html2canvas from 'html2canvas';

const ReportCard = () => {
  const [reportData, setReportData] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [inputName, setInputName] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/classReport/reportData.json');
        const data = await response.json();
        setReportData(data);
        if (selectedName && data.students[selectedName]) {
          setStudentData(data.students[selectedName]);
        } else if (selectedName) {
          setStudentData(null);
        }
      } catch (error) {
        console.error('Error loading report data:', error);
      }
    };
    fetchData();
  }, [selectedName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSelectedName(inputName);
    setShowReport(true);
  };

  if (!reportData || (selectedName && !studentData && reportData.students[selectedName])) 
    return <div className="text-center p-8 text-sky-600">불러오는 중이에요... ✨</div>;

  if (!showReport) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white px-4 py-8 sm:px-6">
        <div className="w-full max-w-md mx-auto mt-8 mb-4">
          <h1 className="text-sky-700 text-3xl font-bold mb-8 tracking-tight relative">
            <div className="flex items-center justify-center">
              <span className="inline-block animate-bounce mr-4">✨</span>
              <div className="flex flex-col items-center">
                <span>생글방글</span>
                <span>학생 리포트</span>
              </div>
              <span className="inline-block animate-bounce ml-4">✨</span>
            </div>
          </h1> 
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              placeholder="학생 이름을 입력해주세요 (예: 김생글)"
              className="w-full p-4 border-2 border-sky-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 text-base text-center bg-white shadow-inner"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-sky-400 to-sky-500 text-white py-4 px-6 rounded-xl hover:from-sky-500 hover:to-sky-600 transition-all transform active:scale-95 shadow-lg font-bold text-lg"
            >
              리포트 보기 🚀
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (!studentData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white px-4 py-8">
        <div className="w-full max-w-md mx-auto mt-8">
          <div className="text-center">
            <h2 className="text-sky-700 text-xl mb-2">앗! 해당 학생 정보를 찾을 수 없어요 😢</h2>
            <p className="text-black-100 text-lg mb-8">예진쌤께 문의를 남겨주세요.</p>
            <button
              onClick={() => {
                setShowReport(false);
                setInputName('');
                setSelectedName('');
              }}
              className="bg-gradient-to-r from-sky-400 to-sky-500 text-white py-4 px-6 rounded-xl hover:from-sky-500 hover:to-sky-600 transition-all active:scale-95 shadow-lg font-bold text-lg"
            >
              다시 찾아볼까요? 🔍
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white px-4 py-8">
      <div className="w-full max-w-md mx-auto space-y-6">
        <div className="space-y-4">
          <h1 className="text-sky-700 text-2xl font-bold break-keep">
            {studentData.studentInfo.reportTitle}
          </h1>
          <p className="text-sky-600 text-sm opacity-75">{studentData.studentInfo.period}</p>
          <div className="bg-white p-4 rounded-xl shadow-md border-2 border-sky-100">
            <div className="text-sky-600 text-lg font-bold">{studentData.studentInfo.name}</div>
            <div className="text-sky-400 text-sm">{studentData.studentInfo.class}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md border-2 border-sky-100">
          <div className="flex items-center mb-3">
            <Star className="text-sky-500 w-5 h-5 mr-2" />
            <h2 className="text-sky-700 text-lg font-bold">글쓰기 성장 그래프</h2>
          </div>
          <p className="text-sky-600 text-sm mb-4 opacity-75">첫 수업부터 지금까지 이만큼 성장했어요!</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={studentData.skillsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0F2FE" />
                <XAxis dataKey="name" stroke="#0EA5E9" fontSize={12} />
                <YAxis stroke="#0EA5E9" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '2px solid #BAE6FD',
                    borderRadius: '12px',
                    padding: '8px'
                  }}
                />
                <Bar dataKey="score" fill="#38BDF8" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md border-2 border-sky-100">
          <div className="flex items-center mb-3">
            <Sparkle className="text-sky-500 w-5 h-5 mr-2" />
            <h2 className="text-sky-700 text-lg font-bold">이달의 반짝반짝 문장</h2>
          </div>
          <p className="text-sky-600 text-sm mb-4 opacity-75">
            {studentData.studentInfo.name} 학생의 글쓰기 중 가장 우수한 문장을 선정했어요!
          </p>
          <ul className="list-none p-0 m-0 space-y-3">
            {studentData.sentences.map((sentence, index) => (
              <li key={index} className="flex items-start bg-sky-50 p-3 rounded-xl border-2 border-sky-100">
                <span className="flex items-center justify-center bg-gradient-to-r from-sky-400 to-sky-500 text-white w-6 h-6 rounded-lg mr-3 flex-shrink-0 text-xs font-bold shadow-md">
                  {index + 1}
                </span>
                <span className="flex-grow leading-relaxed text-sky-700 text-sm">{sentence}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md border-2 border-sky-100">
          <div className="flex items-center mb-3">
            <BookOpen className="text-sky-500 w-5 h-5 mr-2" />
            <h2 className="text-sky-700 text-lg font-bold">주차별 목표 달성률</h2>
          </div>
          <p className="text-sky-600 text-sm mb-4 opacity-75">
            매주 수업 목표를 얼마나 잘 따라왔는지 평가했어요!
          </p>
          <div className="bg-sky-50 rounded-xl p-3 space-y-2">
            {studentData.learningHistory.map((item, index) => (
              <div key={index} className="flex flex-col bg-white p-3 rounded-lg shadow-sm border border-sky-100">
                <div className="flex justify-between items-center mb-1">
                  <div className="text-sky-500 text-sm">{item.date}</div>
                  <div className="text-sky-600 text-sm px-3 py-1 bg-sky-50 rounded-full border border-sky-200">
                    {item.performance}
                  </div>
                </div>
                <div className="text-sky-700 font-medium text-sm">{item.topic}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md border-2 border-sky-100">
          <div className="flex items-center mb-3">
            <Target className="text-sky-500 w-5 h-5 mr-2" />
            <h2 className="text-sky-700 text-lg font-bold">다음 달의 도전</h2>
          </div>
          <p className="text-sky-600 text-sm mb-4 opacity-75">
            2월 수업에서는 이런 점을 보완할 예정이에요.
          </p>
          <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl p-3 space-y-2">
            {studentData.nextGoals.map((goal, index) => (
              <div key={index} className="bg-white rounded-lg p-3 shadow-sm border-2 border-sky-100">
                <span className="text-sky-700 text-sm">🎯 {goal}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-sky-100 to-blue-100 p-4 rounded-xl shadow-lg">
 <div className="flex items-center mb-3">
   <MessageCircle className="text-sky-500 w-5 h-5 mr-2" />
   <h2 className="text-sky-700 text-lg font-bold">선생님의 응원 메시지</h2>
 </div>
 <p className="text-sky-700 text-sm leading-relaxed bg-white/70 p-4 rounded-xl">
   {studentData.teacherComment}
 </p>
</div>

<div className="text-center py-4">
 <button
   onClick={() => {
     setShowReport(false);
     setInputName('');
     setSelectedName('');
   }}
   className="w-full bg-gradient-to-r from-sky-400 to-sky-500 text-white py-4 px-6 rounded-2xl hover:from-sky-500 hover:to-sky-600 transition-all transform hover:scale-105 shadow-lg font-bold text-lg"
 >
   뒤로가기 👈
 </button>
   {/* <button
     onClick={() => {
       html2canvas(document.getElementById('root')).then(function(canvas) {
         const link = document.createElement('a');
         link.download = '생글방글_학생리포트.png';
         link.href = canvas.toDataURL();
         link.click();
       });
     className="bg-gradient-to-r from-sky-400 to-sky-500 text-white py-3 px-4 rounded-xl hover:from-sky-500 hover:to-sky-600 transition-all active:scale-95 shadow-lg font-bold text-sm"
   >
     저장하기 💾
   </button> */}
 </div>
 </div>
 </div>
//  </div>
  );
};

export default ReportCard;