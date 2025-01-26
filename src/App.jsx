import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Star, Sparkle, BookOpen, Target, MessageCircle } from 'lucide-react';

const ReportCard = () => {
  const [reportData, setReportData] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [inputName, setInputName] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/ClassReport/reportData.json');
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
      <div className="w-full max-w-4xl mx-auto bg-gradient-to-b from-sky-50 to-white rounded-3xl shadow-xl p-10 border-2 border-sky-100">
        <h1 className="text-sky-700 text-4xl font-bold mb-8 text-center tracking-tight">
          <span className="inline-block animate-bounce mr-2">✨</span>
          생글방글 학생 리포트
          <span className="inline-block animate-bounce ml-2">✨</span>
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            placeholder="학생 이름을 정확히 입력해주세요"
            className="w-full p-4 border-2 border-sky-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-400 text-lg text-center bg-white shadow-inner"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-sky-400 to-sky-500 text-white py-4 px-6 rounded-2xl hover:from-sky-500 hover:to-sky-600 transition-all transform hover:scale-105 shadow-lg font-bold text-lg"
          >
            리포트 보러가기 🚀
          </button>
        </form>
      </div>
    );
  }

  if (!studentData) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-gradient-to-b from-sky-50 to-white rounded-3xl shadow-xl p-10 border-2 border-sky-100">
        <div className="text-center">
          <h2 className="text-sky-700 text-2xl mb-6">앗! 학생을 찾을 수 없어요 😢</h2>
          <button
            onClick={() => {
              setShowReport(false);
              setInputName('');
              setSelectedName('');
            }}
            className="bg-gradient-to-r from-sky-400 to-sky-500 text-white py-3 px-6 rounded-2xl hover:from-sky-500 hover:to-sky-600 transition-all transform hover:scale-105 shadow-lg font-bold"
          >
            다시 찾아볼까요? 🔍
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-gradient-to-b from-sky-50 to-white rounded-3xl shadow-xl p-10 border-2 border-sky-100">
      <div className="flex justify-between items-center mb-8 pb-6 border-b-2 border-sky-100">
        <div>
          <h1 className="text-sky-700 text-4xl font-bold m-0">{studentData.studentInfo.reportTitle}</h1>
          <p className="text-sky-600 mt-2 opacity-75">{studentData.studentInfo.period}</p>
        </div>
        <div className="text-right bg-white p-4 rounded-2xl shadow-md border-2 border-sky-100">
          <div className="text-sky-600 text-xl font-bold">{studentData.studentInfo.name}</div>
          <div className="text-sky-400">{studentData.studentInfo.class}</div>
        </div>
      </div>

      <div className="mb-12 bg-white p-6 rounded-3xl shadow-md border-2 border-sky-100">
        <div className="flex items-center mb-4">
          <Star className="text-sky-500 w-6 h-6 mr-2" />
          <h2 className="text-sky-700 text-xl font-bold">글쓰기 성장 그래프</h2>
        </div>
        <p className="text-sky-600 mb-6 opacity-75">첫 수업부터 지금까지 이만큼 성장했어요!</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={studentData.skillsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0F2FE" />
              <XAxis dataKey="name" stroke="#0EA5E9" />
              <YAxis stroke="#0EA5E9" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '2px solid #BAE6FD',
                  borderRadius: '12px',
                  padding: '8px'
                }}
              />
              <Bar dataKey="score" fill="#38BDF8" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mb-12 bg-white p-6 rounded-3xl shadow-md border-2 border-sky-100">
        <div className="flex items-center mb-4">
          <Sparkle className="text-sky-500 w-6 h-6 mr-2" />
          <h2 className="text-sky-700 text-xl font-bold">이달의 반짝반짝 문장</h2>
        </div>
        <p className="text-sky-600 mb-6 opacity-75">{studentData.studentInfo.name} 학생이 쓴 멋진 문장이에요!</p>
        <ul className="list-none p-0 m-0 space-y-3">
          {studentData.sentences.map((sentence, index) => (
            <li key={index} className="flex items-start bg-sky-50 p-4 rounded-2xl border-2 border-sky-100">
              <span className="flex items-center justify-center bg-gradient-to-r from-sky-400 to-sky-500 text-white w-8 h-8 rounded-xl mr-4 flex-shrink-0 text-sm font-bold shadow-md">
                {index + 1}
              </span>
              <span className="flex-grow leading-relaxed text-sky-700">{sentence}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-12 bg-white p-6 rounded-3xl shadow-md border-2 border-sky-100">
        <div className="flex items-center mb-4">
          <BookOpen className="text-sky-500 w-6 h-6 mr-2" />
          <h2 className="text-sky-700 text-xl font-bold">주차별 목표 달성률</h2>
        </div>
        <div className="bg-sky-50 rounded-2xl p-6 space-y-3">
          {studentData.learningHistory.map((item, index) => (
            <div key={index} className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-sky-100">
              <div className="text-sky-500 font-medium">{item.date}</div>
              <div className="text-sky-700 font-bold flex-grow mx-6">{item.topic}</div>
              <div className="text-sky-600 font-bold px-4 py-1 bg-sky-50 rounded-full border border-sky-200">
                {item.performance}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-12 bg-white p-6 rounded-3xl shadow-md border-2 border-sky-100">
        <div className="flex items-center mb-4">
          <Target className="text-sky-500 w-6 h-6 mr-2" />
          <h2 className="text-sky-700 text-xl font-bold">다음 달의 도전!</h2>
        </div>
        <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-2xl p-6">
          {studentData.nextGoals.map((goal, index) => (
            <div key={index} className="flex items-center mb-3 last:mb-0">
              <span className="bg-white rounded-xl p-4 shadow-sm border-2 border-sky-100 flex-grow leading-relaxed text-sky-700">
                🎯  {goal}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-sky-100 to-blue-100 p-8 rounded-3xl shadow-lg mb-12">
        <div className="flex items-center mb-4">
          <MessageCircle className="text-sky-500 w-6 h-6 mr-2" />
          <h2 className="text-sky-700 text-xl font-bold">선생님의 응원 메시지</h2>
        </div>
        <p className="text-sky-700 leading-relaxed bg-white/70 p-6 rounded-2xl">
          {studentData.teacherComment}
        </p>
      </div>

      <div className="text-center">
        <button
          onClick={() => {
            setShowReport(false);
            setInputName('');
            setSelectedName('');
          }}
          className="bg-gradient-to-r from-sky-400 to-sky-500 text-white py-3 px-8 rounded-2xl hover:from-sky-500 hover:to-sky-600 transition-all transform hover:scale-105 shadow-lg font-bold inline-flex items-center"
        >
          처음으로 돌아가기 👋
        </button>
      </div>
    </div>
  );
};

export default ReportCard;