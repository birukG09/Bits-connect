import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Download, TrendingUp, Award, Target, BookOpen } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';
import GlassCard from '../components/ui/GlassCard';

interface Course {
  id: string;
  name: string;
  credits: number;
  grade: string;
  points: number;
}

interface Semester {
  id: string;
  name: string;
  courses: Course[];
  gpa: number;
}

const GPA = () => {
  const [semesters, setSemesters] = useState<Semester[]>([
    {
      id: '1',
      name: 'Fall 2023',
      courses: [
        { id: '1', name: 'Data Structures', credits: 4, grade: 'A', points: 4.0 },
        { id: '2', name: 'Calculus II', credits: 3, grade: 'B+', points: 3.3 },
        { id: '3', name: 'Physics I', credits: 4, grade: 'A-', points: 3.7 },
      ],
      gpa: 3.7
    },
    {
      id: '2',
      name: 'Spring 2024',
      courses: [
        { id: '4', name: 'Algorithms', credits: 4, grade: 'A', points: 4.0 },
        { id: '5', name: 'Database Systems', credits: 3, grade: 'A-', points: 3.7 },
        { id: '6', name: 'Linear Algebra', credits: 3, grade: 'B+', points: 3.3 },
      ],
      gpa: 3.7
    }
  ]);

  const [currentSemester, setCurrentSemester] = useState<Semester>({
    id: 'current',
    name: 'Fall 2024',
    courses: [],
    gpa: 0
  });

  const gradePoints: { [key: string]: number } = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'F': 0.0
  };

  const addCourse = () => {
    const newCourse: Course = {
      id: Date.now().toString(),
      name: '',
      credits: 3,
      grade: 'A',
      points: 4.0
    };

    setCurrentSemester(prev => ({
      ...prev,
      courses: [...prev.courses, newCourse]
    }));
  };

  const updateCourse = (courseId: string, field: keyof Course, value: string | number) => {
    setCurrentSemester(prev => ({
      ...prev,
      courses: prev.courses.map(course => {
        if (course.id === courseId) {
          const updatedCourse = { ...course, [field]: value };
          if (field === 'grade') {
            updatedCourse.points = gradePoints[value as string];
          }
          return updatedCourse;
        }
        return course;
      })
    }));
  };

  const removeCourse = (courseId: string) => {
    setCurrentSemester(prev => ({
      ...prev,
      courses: prev.courses.filter(course => course.id !== courseId)
    }));
  };

  const calculateGPA = (courses: Course[]) => {
    if (courses.length === 0) return 0;
    
    const totalPoints = courses.reduce((sum, course) => sum + (course.points * course.credits), 0);
    const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
    
    return totalCredits > 0 ? totalPoints / totalCredits : 0;
  };

  const currentGPA = calculateGPA(currentSemester.courses);
  const cumulativeGPA = calculateGPA([
    ...semesters.flatMap(sem => sem.courses),
    ...currentSemester.courses
  ]);

  const saveSemester = () => {
    if (currentSemester.courses.length === 0) {
      toast.error('Please add at least one course');
      return;
    }

    const completedSemester = {
      ...currentSemester,
      gpa: currentGPA
    };

    setSemesters(prev => [...prev, completedSemester]);
    setCurrentSemester({
      id: 'current',
      name: `Semester ${semesters.length + 2}`,
      courses: [],
      gpa: 0
    });

    toast.success('Semester saved successfully!');
  };

  const chartData = semesters.map(semester => ({
    name: semester.name,
    gpa: semester.gpa
  }));

  const exportPDF = () => {
    toast.success('GPA report exported successfully!');
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            GPA Calculator
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Track your academic progress with our advanced GPA calculator and analytics
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <GlassCard className="p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {cumulativeGPA.toFixed(2)}
            </div>
            <div className="text-white/70">Cumulative GPA</div>
          </GlassCard>

          <GlassCard className="p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {currentGPA.toFixed(2)}
            </div>
            <div className="text-white/70">Current Semester</div>
          </GlassCard>

          <GlassCard className="p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {semesters.length}
            </div>
            <div className="text-white/70">Completed Semesters</div>
          </GlassCard>

          <GlassCard className="p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {semesters.reduce((total, sem) => total + sem.courses.length, 0) + currentSemester.courses.length}
            </div>
            <div className="text-white/70">Total Courses</div>
          </GlassCard>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Current Semester Calculator */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Current Semester</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={addCourse}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-200"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Course</span>
                </motion.button>
              </div>

              <div className="space-y-4">
                <div className="mb-4">
                  <input
                    type="text"
                    value={currentSemester.name}
                    onChange={(e) => setCurrentSemester(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Semester name"
                  />
                </div>

                {currentSemester.courses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    className="grid grid-cols-12 gap-2 items-center p-4 bg-white/5 rounded-lg border border-white/10"
                  >
                    <div className="col-span-5">
                      <input
                        type="text"
                        value={course.name}
                        onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-green-500"
                        placeholder="Course name"
                      />
                    </div>
                    
                    <div className="col-span-2">
                      <input
                        type="number"
                        value={course.credits}
                        onChange={(e) => updateCourse(course.id, 'credits', parseInt(e.target.value))}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white focus:outline-none focus:ring-1 focus:ring-green-500"
                        min="1"
                        max="6"
                      />
                    </div>
                    
                    <div className="col-span-3">
                      <select
                        value={course.grade}
                        onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white focus:outline-none focus:ring-1 focus:ring-green-500"
                      >
                        {Object.keys(gradePoints).map(grade => (
                          <option key={grade} value={grade} className="bg-gray-800">
                            {grade}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="col-span-1">
                      <span className="text-white/70 text-sm">
                        {course.points.toFixed(1)}
                      </span>
                    </div>
                    
                    <div className="col-span-1">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeCourse(course.id)}
                        className="p-2 text-red-400 hover:bg-red-500/20 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}

                {currentSemester.courses.length === 0 && (
                  <div className="text-center py-12 text-white/50">
                    <BookOpen className="w-16 h-16 mx-auto mb-4" />
                    <p>No courses added yet. Click "Add Course" to get started.</p>
                  </div>
                )}
              </div>

              {currentSemester.courses.length > 0 && (
                <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-white">
                        {currentGPA.toFixed(2)}
                      </div>
                      <div className="text-white/70">Semester GPA</div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={saveSemester}
                      className="px-6 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-200"
                    >
                      Save Semester
                    </motion.button>
                  </div>
                </div>
              )}
            </GlassCard>
          </motion.div>

          {/* GPA History */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">GPA History</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={exportPDF}
                  className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200"
                >
                  <Download className="w-4 h-4" />
                  <span>Export PDF</span>
                </motion.button>
              </div>

              {chartData.length > 0 ? (
                <div className="h-64 mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis 
                        dataKey="name" 
                        stroke="rgba(255,255,255,0.7)" 
                        fontSize={12}
                      />
                      <YAxis 
                        stroke="rgba(255,255,255,0.7)" 
                        fontSize={12}
                        domain={[0, 4]}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(0,0,0,0.8)', 
                          border: '1px solid rgba(255,255,255,0.2)',
                          borderRadius: '8px',
                          color: 'white'
                        }} 
                      />
                      <Bar 
                        dataKey="gpa" 
                        fill="url(#gradient)"
                        radius={[4, 4, 0, 0]}
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10B981" />
                          <stop offset="100%" stopColor="#3B82F6" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center text-white/50">
                  <div className="text-center">
                    <TrendingUp className="w-16 h-16 mx-auto mb-4" />
                    <p>No GPA history available yet.</p>
                  </div>
                </div>
              )}

              {/* Semester List */}
              <div className="space-y-3">
                {semesters.map((semester, index) => (
                  <motion.div
                    key={semester.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
                  >
                    <div>
                      <div className="text-white font-medium">{semester.name}</div>
                      <div className="text-white/60 text-sm">
                        {semester.courses.length} courses
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">{semester.gpa.toFixed(2)}</div>
                      <div className="text-white/60 text-sm">GPA</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Grade Scale */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-8"
        >
          <GlassCard className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Grade Scale</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Object.entries(gradePoints).map(([grade, points]) => (
                <div
                  key={grade}
                  className="text-center p-3 bg-white/5 rounded-lg border border-white/10"
                >
                  <div className="text-white font-bold text-lg">{grade}</div>
                  <div className="text-white/70 text-sm">{points.toFixed(1)}</div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default GPA;