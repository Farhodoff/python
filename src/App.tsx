/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, FormEvent } from "react";
import { 
  Terminal, Award, BookOpen, Clock, Play, RotateCcw, Flame, 
  HelpCircle, CheckCircle2, AlertTriangle, BookMarked, Code, 
  Briefcase, MessageSquare, ChevronRight, ChevronDown, ListTodo, 
  Sparkles, Check, Heart, ShieldAlert, Cpu, Search, Trophy, Gift,
  FileBadge, Settings, Users, Server, Plus, Trash2, Mail, Lock, LogIn, ArrowRight, X
} from "lucide-react";

import Header from "./components/Header";
import AIChatbot from "./components/AIChatbot";
import CodeEditor from "./components/CodeEditor";
import Certificate from "./components/Certificate";
import { 
  initialCourses, 
  practiceChallenges, 
  quizQuestions, 
  interviewQuestions, 
  projectSpecs, 
  initialLeaderboard, 
  achievementsList 
} from "./data";
import { Course, Difficulty, Challenge, QuizQuestion, InterviewQuestion, ProjectSpec, UserProfile, LeaderboardEntry } from "./types";

// Firebase Integration
import { auth, db, googleProvider, handleFirestoreError, OperationType } from "./lib/firebase";
import { 
  signInWithPopup, 
  signOut, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  onAuthStateChanged 
} from "firebase/auth";
import { doc, getDoc, setDoc, collection, onSnapshot } from "firebase/firestore";

// Safe dynamic icon mapping
const IconMap: { [key: string]: any } = {
  Terminal: Terminal,
  Award: Award,
  BookOpen: BookOpen,
  Flame: Flame,
  Trophy: Trophy,
  Cpu: Cpu,
  ShieldAlert: ShieldAlert
};

export default function App() {
  // Tab State
  const [activeTab, setActiveTab] = useState<string>("interview");
  
  // Theme State
  const [darkMode, setDarkMode] = useState<boolean>(true);

  // Auth State
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authName, setAuthName] = useState("");
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  // Core User Profile state
  const [user, setUser] = useState<UserProfile>({
    uid: "currentUser",
    name: "Mehmon",
    email: "mehmon@pyschool.uz",
    xp: 0,
    streak: 0,
    completedLessons: [],
    completedChallenges: [],
    completedQuizzes: [],
    completedProjects: [],
    skillsRadar: { "Asoslar": 0, "OOP": 0, "Web API": 0, "Algoritmlar": 0 },
    achievements: [],
    certificateEarned: false
  });

  // Dynamic Syllabus Track selections
  const [activeCourse, setActiveCourse] = useState<Course>(initialCourses[0]);
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);

  // Quiz evaluation state
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<{ [questionId: string]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Active Challenge context (Practice)
  const [activeChallenge, setActiveChallenge] = useState<Challenge>(practiceChallenges[0]);

  // Active Interview Category
  const [selectedCategory, setSelectedCategory] = useState<string>("Barchasi");
  const [interviewSearch, setInterviewSearch] = useState<string>("");

  // State for interactive project submission
  const [submittingProjectId, setSubmittingProjectId] = useState<string | null>(null);
  const [projectGithubUrl, setProjectGithubUrl] = useState<string>("");
  const [projectNotes, setProjectNotes] = useState<string>("");

  // Admin dynamic control lists
  const [coursesList, setCoursesList] = useState<Course[]>(() => {
    const saved = localStorage.getItem("pyschool_courses");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error loading courses from localStorage:", e);
      }
    }
    return initialCourses;
  });
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(initialLeaderboard);

  // Sync darkMode with document UI class
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  // Firebase Authentication dynamic listener and user profile load
  const [firebaseUser, setFirebaseUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fUser) => {
      setFirebaseUser(fUser);
      if (fUser) {
        const userRef = doc(db, "users", fUser.uid);
        try {
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            setUser(userDoc.data() as UserProfile);
          } else {
            const initialProfile: UserProfile = {
              uid: fUser.uid,
              name: fUser.displayName || "Pythonist",
              email: fUser.email || "",
              xp: 100,
              streak: 1,
              completedLessons: [],
              completedChallenges: [],
              completedQuizzes: [],
              completedProjects: [],
              skillsRadar: { "Asoslar": 0, "OOP": 0, "Web API": 0, "Algoritmlar": 0 },
              achievements: [],
              certificateEarned: false
            };
            try {
              await setDoc(userRef, initialProfile);
            } catch (err) {
              handleFirestoreError(err, OperationType.WRITE, `users/${fUser.uid}`);
            }
            setUser(initialProfile);

            // Add to leaderboard
            const leaderRef = doc(db, "leaderboard", fUser.uid);
            try {
              await setDoc(leaderRef, {
                uid: fUser.uid,
                name: fUser.displayName || "Pythonist",
                xp: 100,
                avatar: "🐍",
                rank: leaderboard.length + 1
              });
            } catch (err) {
              handleFirestoreError(err, OperationType.WRITE, `leaderboard/${fUser.uid}`);
            }
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.GET, `users/${fUser.uid}`);
        }
      } else {
        // Guest mode fallback
        const storedUser = localStorage.getItem("pyschool_user");
        if (storedUser) {
          try {
            const parsed = JSON.parse(storedUser);
            if (parsed && parsed.uid === "currentUser") {
              setUser(parsed);
            } else {
              const guestProfile: UserProfile = {
                uid: "currentUser",
                name: "Mehmon",
                email: "mehmon@pyschool.uz",
                xp: 0,
                streak: 0,
                completedLessons: [],
                completedChallenges: [],
                completedQuizzes: [],
                completedProjects: [],
                skillsRadar: { "Asoslar": 0, "OOP": 0, "Web API": 0, "Algoritmlar": 0 },
                achievements: [],
                certificateEarned: false
              };
              setUser(guestProfile);
              localStorage.setItem("pyschool_user", JSON.stringify(guestProfile));
            }
          } catch (e) {
            console.error("Storage restoring state issue:", e);
          }
        } else {
          setUser({
            uid: "currentUser",
            name: "Mehmon",
            email: "mehmon@pyschool.uz",
            xp: 0,
            streak: 0,
            completedLessons: [],
            completedChallenges: [],
            completedQuizzes: [],
            completedProjects: [],
            skillsRadar: { "Asoslar": 0, "OOP": 0, "Web API": 0, "Algoritmlar": 0 },
            achievements: [],
            certificateEarned: false
          });
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Real-time Leaderboard syncing from Firestore
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "leaderboard"), (snapshot) => {
      const entries: LeaderboardEntry[] = [];
      snapshot.forEach(doc => {
        entries.push(doc.data() as LeaderboardEntry);
      });
      if (entries.length > 0) {
        const sorted = entries.sort((a, b) => b.xp - a.xp).map((entry, idx) => ({ ...entry, rank: idx + 1 }));
        setLeaderboard(sorted);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, "leaderboard");
    });
    return () => unsub();
  }, [firebaseUser]);

  const saveUserProgress = async (updatedUser: UserProfile) => {
    setUser(updatedUser);
    localStorage.setItem("pyschool_user", JSON.stringify(updatedUser));

    if (auth.currentUser) {
      const userRef = doc(db, "users", auth.currentUser.uid);
      try {
        await setDoc(userRef, updatedUser);
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `users/${auth.currentUser.uid}`);
      }

      const leaderRef = doc(db, "leaderboard", auth.currentUser.uid);
      try {
        await setDoc(leaderRef, {
          uid: auth.currentUser.uid,
          name: updatedUser.name,
          xp: updatedUser.xp,
          avatar: "🐍",
          rank: 1
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `leaderboard/${auth.currentUser.uid}`);
      }
    }
  };

  // Autocomplete code lesson actions
  const handleLessonSuccess = (xpEarned: number) => {
    const activeLesson = activeCourse.modules[activeModuleIndex]?.lessons[activeLessonIndex];
    if (!activeLesson) return;

    if (!user.completedLessons.includes(activeLesson.id)) {
      const updatedLessons = [...user.completedLessons, activeLesson.id];
      const updatedXp = user.xp + xpEarned;
      
      // Upgrade skills radar mapping
      const isBasics = activeCourse.id === "basics";
      const isOop = activeCourse.id === "oop";
      const isAdvanced = activeCourse.id === "advanced_python";

      const skills = { ...user.skillsRadar };
      if (isBasics) skills["Asoslar"] = Math.min(100, (skills["Asoslar"] || 0) + 20);
      if (isOop) skills["OOP"] = Math.min(100, (skills["OOP"] || 0) + 40);
      if (isAdvanced) skills["Web API"] = Math.min(100, (skills["Web API"] || 0) + 33);

      // Trigger achievement if user completes the first lesson
      const achievements = [...user.achievements];
      if (!achievements.includes("ach_2")) {
        achievements.push("ach_2");
      }

      // If user marks everything as completed, enable certificate
      const allComplete = updatedLessons.length >= 4;

      const newUser: UserProfile = {
        ...user,
        completedLessons: updatedLessons,
        xp: updatedXp,
        skillsRadar: skills,
        achievements: achievements,
        certificateEarned: allComplete ? true : user.certificateEarned
      };

      saveUserProgress(newUser);
      
      // Update our leaderboard
      const updatedLeader = leaderboard.map(entry => {
        if (entry.uid === user.uid) {
          return { ...entry, xp: updatedXp };
        }
        return entry;
      }).sort((a, b) => b.xp - a.xp);
      
      setLeaderboard(updatedLeader);
    }
  };

  // Complete interactive practice challenges
  const handleChallengeSuccess = (xpEarned: number) => {
    if (!user.completedChallenges.includes(activeChallenge.id)) {
      const updatedCh = [...user.completedChallenges, activeChallenge.id];
      const updatedXp = user.xp + xpEarned;

      const skills = { ...user.skillsRadar };
      skills["Algoritmlar"] = Math.min(100, (skills["Algoritmlar"] || 10) + 30);

      const newUser: UserProfile = {
        ...user,
        completedChallenges: updatedCh,
        xp: updatedXp,
        skillsRadar: skills
      };

      saveUserProgress(newUser);
    }
  };

  // Real Firebase Auth Login/Register Action
  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!authEmail.trim() || !authPassword.trim()) return;

    try {
      if (isRegisterMode) {
        const credential = await createUserWithEmailAndPassword(auth, authEmail, authPassword);
        if (credential.user) {
          await updateProfile(credential.user, {
            displayName: authName.trim() || "Pythonist"
          });
        }
      } else {
        await signInWithEmailAndPassword(auth, authEmail, authPassword);
      }
      setShowAuthModal(false);
    } catch (err: any) {
      alert("Xatolik yuz berdi: " + err.message);
    }
  };

  // Google Login helper
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setShowAuthModal(false);
    } catch (err: any) {
      alert("Xatolik yuz berdi: " + err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      const guestProfile: UserProfile = {
        uid: "currentUser",
        name: "Mehmon",
        email: "mehmon@pyschool.uz",
        xp: 0,
        streak: 0,
        completedLessons: [],
        completedChallenges: [],
        completedQuizzes: [],
        completedProjects: [],
        skillsRadar: { "Asoslar": 0, "OOP": 0, "Web API": 0, "Algoritmlar": 0 },
        achievements: [],
        certificateEarned: false
      };
      setUser(guestProfile);
      localStorage.setItem("pyschool_user", JSON.stringify(guestProfile));
      alert("Siz muvaffaqiyatli chiqdingiz! (Mehmon rejimiga o'tildi)");
    } catch (err: any) {
      alert("Xatolik yuz berdi: " + err.message);
    }
  };

  // Quick category filters for interviews
  const interviewCategories = ["Barchasi", "Basics", "OOP - Advanced", "System & Memory", "Concurreny"];
  const filteredInterviews = interviewQuestions.filter(q => {
    const matchesCat = selectedCategory === "Barchasi" || q.category === selectedCategory;
    const matchesSearch = q.question.toLowerCase().includes(interviewSearch.toLowerCase()) || 
                          q.answer.toLowerCase().includes(interviewSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const activeLesson = activeCourse.modules[activeModuleIndex]?.lessons[activeLessonIndex];
  const activeQuizList = quizQuestions[activeCourse.modules[activeModuleIndex]?.id] || [];

  const handleQuizSubmit = () => {
    let score = 0;
    activeQuizList.forEach(q => {
      if (selectedQuizAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });

    setQuizScore(score);
    setQuizSubmitted(true);

    if (score === activeQuizList.length) {
      if (!user.completedQuizzes.includes(activeCourse.modules[activeModuleIndex].id)) {
        const updatedQuizzes = [...user.completedQuizzes, activeCourse.modules[activeModuleIndex].id];
        const updatedXp = user.xp + 50; // extra bonus
        
        const achievements = [...user.achievements];
        if (!achievements.includes("ach_3")) {
          achievements.push("ach_3");
        }

        saveUserProgress({
          ...user,
          completedQuizzes: updatedQuizzes,
          xp: updatedXp,
          achievements: achievements
        });
      }
    }
  };

  return (
    <div className={`min-h-screen font-sans flex flex-col justify-between transition-colors duration-300 dark:bg-[#050505] bg-slate-50 text-slate-950 dark:text-slate-350`}>
      
      {/* Platform Header */}
      <Header 
        user={user} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        darkMode={darkMode} 
        setDarkMode={setDarkMode}
        onLogout={handleLogout}
        onLoginSim={() => {
          setIsRegisterMode(false);
          setShowAuthModal(true);
        }}
      />

      {/* Main Container Wrapper */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-grow">

        {/* TAB 2: COURSES SYSTEM */}
        {activeTab === "courses" && (
          <div className="space-y-6 animate-fadeIn" id="courses_tab_pane">
            
            {/* Navigational Sub-header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200 dark:border-zinc-800 gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-sans font-extrabold text-slate-900 dark:text-white">Syllabus & Interaktiv Darsliklar</h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400">Kerakli mavzuni chap tomondan tanlang va o'ng tomonda sinab ko'ring</p>
              </div>

              {/* Course Selector track tabs */}
              <div className="flex space-x-1.5 self-start sm:self-center overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0" id="course_selector_sub_nav">
                {coursesList.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setActiveCourse(c);
                      setActiveModuleIndex(0);
                      setActiveLessonIndex(0);
                      setQuizSubmitted(false);
                      setSelectedQuizAnswers({});
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
                      activeCourse.id === c.id
                        ? "bg-yellow-500 text-slate-950 shadow"
                        : "bg-white border border-gray-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-400 dark:bg-zinc-900 hover:bg-slate-100"
                    }`}
                  >
                    {c.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Core Course Workspace Splitter */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column navbar (3/12 width) */}
              <div className="lg:col-span-3 space-y-4">
                <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm" id="course_lesson_explorer">
                  <h3 className="text-xs font-mono font-bold text-slate-500 tracking-wider uppercase mb-3 px-1">Kurs tarkibi</h3>
                  
                  <div className="space-y-4">
                    {activeCourse.modules.map((mod, modIdx) => (
                      <div key={mod.id} className="space-y-1">
                        <div className="flex items-center space-x-1 py-1 text-slate-900 dark:text-white font-sans font-bold text-xs uppercase px-1">
                          <BookMarked className="w-3.5 h-3.5 text-yellow-500 mr-1" />
                          <span>{mod.title}</span>
                        </div>

                        {/* Lessons in module */}
                        <div className="pl-3 space-y-1">
                          {mod.lessons.map((les, lesIdx) => {
                            const isSelected = activeModuleIndex === modIdx && activeLessonIndex === lesIdx;
                            const isCompleted = user.completedLessons.includes(les.id);
                            
                            return (
                              <button
                                key={les.id}
                                onClick={() => {
                                  setActiveModuleIndex(modIdx);
                                  setActiveLessonIndex(lesIdx);
                                  setQuizSubmitted(false);
                                  setSelectedQuizAnswers({});
                                }}
                                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-all cursor-pointer ${
                                  isSelected
                                    ? "bg-yellow-50 dark:bg-yellow-950/20 text-yellow-700 dark:text-yellow-400 font-semibold border-l-2 border-yellow-500"
                                    : "text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-850"
                                }`}
                              >
                                <span className="truncate">{les.title}</span>
                                {isCompleted ? (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0 ml-1.5" />
                                ) : (
                                  <Clock className="w-3.5 h-3.5 text-slate-300 dark:text-zinc-700 flex-shrink-0 ml-1.5" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Quizzes Button */}
                  {activeQuizList.length > 0 && (
                    <div className="pt-4 mt-2 border-t border-slate-105 dark:border-zinc-800">
                      <button
                        onClick={() => {
                          setQuizSubmitted(false);
                          setSelectedQuizAnswers({});
                          // Setting out of bound indices triggers Quiz Mode
                          setActiveLessonIndex(-1);
                        }}
                        className={`w-full text-center py-2.5 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 border transition-all cursor-pointer ${
                          activeLessonIndex === -1
                            ? "bg-yellow-500 text-slate-950 hover:bg-yellow-600 border-yellow-500 shadow"
                            : "bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-50"
                        }`}
                      >
                        <Award className="w-4 h-4" />
                        <span>Modul Test savollari ({activeQuizList.length})</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Progress helper summary bar */}
                <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm space-y-2 text-xs font-sans">
                  <div className="flex justify-between items-center text-slate-500">
                    <span>O'quv kursi progressi:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{user.completedLessons.length} dars</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-yellow-500 h-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (user.completedLessons.length / 4) * 100)}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-zinc-400 block pt-1">Barcha darslarni o'tish sertifikatni faollashtiradi.</span>
                </div>
              </div>

              <div className="lg:col-span-9">
                {activeCourse.modules.length === 0 ? (
                  <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-8 shadow-sm text-center space-y-4 py-16 animate-fadeIn">
                    <BookOpen className="w-12 h-12 text-yellow-500 mx-auto animate-pulse" />
                    <div className="space-y-1">
                      <h3 className="text-lg font-sans font-bold text-slate-900 dark:text-white">Ushbu kurs rejasi bo'sh</h3>
                      <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-sm mx-auto leading-relaxed">
                        Ushbu o'quv dasturi muvaffaqiyatli dars tizimida ro'yxatga olindi. Hozirda bu kurs bo'sh darslik hisoblanadi.
                      </p>
                    </div>
                  </div>
                ) : activeLessonIndex === -1 ? (
                  // QUIZ MODE WORKSPACE
                  <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-6 animate-fadeIn" id="quiz_workspace_card">
                    <div className="flex items-center justify-between border-b border-gray-100 dark:border-zinc-800 pb-4">
                      <div className="space-y-1">
                        <span className="text-[10px] bg-yellow-105 text-yellow-700 px-2 py-0.5 rounded font-bold uppercase">Bilimni tekshirish</span>
                        <h2 className="text-xl font-sans font-extrabold text-slate-900 dark:text-white">
                          {activeCourse.modules[activeModuleIndex]?.title}: Module Quiz
                        </h2>
                      </div>
                      <Award className="w-8 h-8 text-yellow-500" />
                    </div>

                    <div className="space-y-6">
                      {activeQuizList.map((q, qidx) => (
                        <div key={q.id} className="p-4 bg-slate-50 dark:bg-zinc-950/35 border border-slate-100 dark:border-zinc-850 rounded-xl space-y-3">
                          <h4 className="font-sans font-bold text-sm text-slate-950 dark:text-white flex items-start">
                            <span className="mr-2 text-yellow-600 font-mono">{qidx + 1}.</span>
                            {q.question}
                          </h4>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-4">
                            {q.options.map((opt, oindex) => {
                              const isSelected = selectedQuizAnswers[q.id] === oindex;
                              const isCorrect = q.correctIndex === oindex;
                              const showResults = quizSubmitted;

                              return (
                                <button
                                  key={oindex}
                                  disabled={quizSubmitted}
                                  onClick={() => {
                                    setSelectedQuizAnswers(prev => ({ ...prev, [q.id]: oindex }));
                                  }}
                                  className={`p-3 text-left rounded-xl text-xs transition-all ${
                                    isSelected 
                                      ? showResults
                                        ? isCorrect
                                          ? "bg-green-100 text-green-900 dark:bg-green-950/20 dark:text-green-400 border border-green-300"
                                          : "bg-red-100 text-red-900 dark:bg-red-950/20 dark:text-red-400 border border-red-300"
                                        : "bg-yellow-100 dark:bg-yellow-950/20 text-yellow-904 dark:text-yellow-400 border border-yellow-300"
                                      : showResults && isCorrect
                                        ? "bg-green-100 text-green-905 dark:bg-green-950/20 dark:text-green-400 border border-green-305"
                                        : "bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-100"
                                  }`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>

                          {quizSubmitted && (
                            <div className="mt-3 pl-4 pt-2.5 border-t border-slate-100 dark:border-zinc-850 text-xs font-sans text-slate-500 leading-relaxed dark:text-zinc-400">
                              <span className="font-bold text-slate-700 dark:text-zinc-300">Tafsilotlar:</span> {q.explanation}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Submit Quiz controls */}
                    <div className="pt-4 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-between">
                      {!quizSubmitted ? (
                        <button
                          onClick={handleQuizSubmit}
                          disabled={Object.keys(selectedQuizAnswers).length !== activeQuizList.length}
                          className="px-6 py-2.5 bg-yellow-500 hover:bg-yellow-600 disabled:bg-slate-100 text-slate-950 font-bold rounded-xl text-xs transition shadow cursor-pointer"
                        >
                          Natijani Tekshirish (Submit)
                        </button>
                      ) : (
                        <div className="flex items-center space-x-4">
                          <span className="font-sans font-bold text-sm">
                            Natija: <strong className="text-yellow-500">{quizScore} / {activeQuizList.length}</strong> to'g'ri.
                          </span>
                          <button
                            onClick={() => {
                              setQuizSubmitted(false);
                              setSelectedQuizAnswers({});
                            }}
                            className="text-xs bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 text-slate-700 dark:text-zinc-100 px-4 py-2 rounded-xl transition cursor-pointer"
                          >
                            Qayta urinib ko'rish
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  // REGULAR LESSON STUDY MODE
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6" id="lesson_workspace">
                    
                    {/* Left Panel: Theory Notes block */}
                    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm overflow-y-auto max-h-[550px] space-y-5">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <div className="flex items-center text-[10px] text-yellow-600 dark:text-yellow-400 font-bold uppercase tracking-wider">
                            <span>{activeCourse.title}</span>
                            <ChevronRight className="w-3 h-3 mx-1" />
                            <span>{activeCourse.modules[activeModuleIndex]?.title}</span>
                          </div>
                          <h2 className="text-xl sm:text-2xl font-sans font-extrabold text-slate-900 dark:text-white tracking-tight">
                            {activeLesson?.title}
                          </h2>
                        </div>
                        <span className="text-[10px] bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 px-2 py-0.5 rounded font-mono font-bold whitespace-nowrap">
                          {activeLesson?.duration}
                        </span>
                      </div>

                      {/* Lesson Rich Text Markdown rendering */}
                      <div className="prose prose-slate dark:prose-invert max-w-none text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-zinc-300 font-sans space-y-4">
                        {activeLesson?.content.split("\n\n").map((chunk, idx) => {
                          if (chunk.startsWith("###")) {
                            return <h3 key={idx} className="font-sans font-extrabold text-slate-900 dark:text-white text-sm sm:text-base border-b border-gray-100 dark:border-zinc-800 pb-1 mt-4">{chunk.replace("### ", "")}</h3>;
                          }
                          if (chunk.startsWith("`") && chunk.endsWith("`")) {
                            return (
                              <pre key={idx} className="bg-slate-950 p-4 rounded-xl text-yellow-300 font-mono text-xs overflow-x-auto shadow-inner border border-slate-800 my-2">
                                <code>{chunk.replace(/```python|```/g, "")}</code>
                              </pre>
                            );
                          }
                          return <p key={idx} className="whitespace-pre-line">{chunk}</p>;
                        })}
                      </div>

                      {/* Exercise prompt card */}
                      {activeLesson?.exercisePrompt && (
                        <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-950/40 rounded-xl space-y-1.5 font-sans">
                          <h4 className="text-xs font-bold text-yellow-700 dark:text-yellow-400 flex items-center space-x-1.5">
                            <Sparkles className="w-4 h-4" />
                            <span>Dars mashiqi talabi:</span>
                          </h4>
                          <p className="text-xs text-slate-700 dark:text-zinc-300 font-medium">{activeLesson.exercisePrompt}</p>
                        </div>
                      )}
                    </div>

                    {/* Right Panel: Integrated active IDE code compiler */}
                    <div className="flex flex-col h-[550px]">
                      {activeLesson && (
                        <CodeEditor 
                          initialCode={activeLesson.codeExample}
                          solutionCode={activeLesson.solution}
                          testCases={activeLesson.testCases}
                          onCorrectSolution={() => handleLessonSuccess(25)}
                          gainedXpPoints={25}
                        />
                      )}
                    </div>

                  </div>
                )}
              </div>

            </div>

          </div>
        )}

        {/* TAB 3: PRACTICE SANDBOX */}
        {activeTab === "practice" && (
          <div className="space-y-6 animate-fadeIn" id="practice_tab_pane">
            <div className="pb-4 border-b border-gray-200 dark:border-zinc-800">
              <h1 className="text-2xl sm:text-3xl font-sans font-extrabold text-slate-900 dark:text-white">Mustaqil Amaliyot & Masalalar</h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400">Turli mantiqiy algoritmlarni isboti bilan yechib, tajriba ballariz (XP)ni oshiring</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Challenge List panels (4/12 width) */}
              <div className="lg:col-span-4 space-y-3">
                {practiceChallenges.map((ch) => {
                  const isSelected = activeChallenge.id === ch.id;
                  const isCompleted = user.completedChallenges.includes(ch.id);

                  return (
                    <div 
                      key={ch.id}
                      onClick={() => setActiveChallenge(ch)}
                      className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start justify-between ${
                        isSelected 
                          ? "bg-yellow-50 dark:bg-yellow-950/25 border-yellow-500 shadow-sm" 
                          : "bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 hover:bg-slate-100"
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="space-y-0.5">
                          <span className="text-[9px] bg-slate-100 dark:bg-zinc-800 px-2 py-0.5 rounded font-mono font-bold tracking-wider">{ch.category}</span>
                          <h3 className="font-sans font-bold text-sm text-slate-900 dark:text-white pt-1">{ch.title}</h3>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-sans leading-relaxed line-clamp-2">
                          {ch.description}
                        </p>
                        <div className="flex items-center space-x-3 text-[10px] font-semibold text-slate-400">
                          <span>{ch.difficulty}</span>
                          <span className="text-yellow-500 font-mono font-bold">+{ch.points} XP</span>
                        </div>
                      </div>

                      <div className="flex-shrink-0 ml-2">
                        {isCompleted ? (
                          <span className="bg-green-100 dark:bg-green-950/45 text-green-600 dark:text-green-400 p-1 rounded-full block">
                            <Check className="w-4 h-4 font-extrabold" />
                          </span>
                        ) : (
                          <span className="bg-slate-100 dark:bg-zinc-800 text-slate-400 dark:text-zinc-600 px-2 py-0.5 rounded text-[9px] font-bold">Yechilmagan</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Sandbox Coding compiler Workspace (8/12 width) */}
              <div className="lg:col-span-8 flex flex-col h-[525px]">
                <div className="mb-4 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 p-4 rounded-2xl flex items-center justify-between shadow-sm">
                  <div>
                    <h3 className="font-bold text-base">{activeChallenge.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed max-w-xl">{activeChallenge.description}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-xs font-mono font-bold text-yellow-600 dark:text-yellow-400 block">Ball: +{activeChallenge.points} XP</span>
                    <span className="text-[10px] text-zinc-500">{activeChallenge.difficulty}</span>
                  </div>
                </div>

                <div className="flex-1">
                  <CodeEditor 
                    initialCode={activeChallenge.initialCode}
                    solutionCode={activeChallenge.solutionCode}
                    testCases={activeChallenge.testCases}
                    onCorrectSolution={() => handleChallengeSuccess(activeChallenge.points)}
                    gainedXpPoints={activeChallenge.points}
                  />
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 4: INTERVIEW SUHBAT SAVOLLARI */}
        {activeTab === "interview" && (
          <div className="space-y-6 animate-fadeIn" id="interview_tab_pane">
            
            {/* Navigational details */}
            <div className="pb-4 border-b border-gray-200 dark:border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-sans font-extrabold text-slate-900 dark:text-white">Python Dasturchi Suhbat Savollari</h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400">Ishga kirish suhbatlarida eng ko'p so'raladigan savollar va professional andozalar</p>
              </div>

              {/* Filtering bar */}
              <div className="flex items-center bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl px-3 py-1.5 w-full md:w-80 shadow-sm">
                <Search className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                <input 
                  type="text" 
                  value={interviewSearch}
                  onChange={(e) => setInterviewSearch(e.target.value)}
                  placeholder="Texnologiyani haklang..." 
                  className="bg-transparent text-xs w-full outline-none border-none text-slate-900 dark:text-white font-sans"
                />
              </div>
            </div>

            {/* Quick Filter chips */}
            <div className="flex space-x-2 pb-2 overflow-x-auto" id="interview_filters_nav">
              {interviewCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-yellow-500 text-slate-950 font-semibold"
                      : "bg-white border border-gray-250 dark:border-zinc-800 text-slate-700 dark:text-zinc-400 dark:bg-zinc-900 hover:bg-slate-100"
                  }`}
                >
                  {cat === "Barchasi" ? "Barcha bo'limlar" : cat}
                </button>
              ))}
            </div>

            {/* Expandable Interview List cards */}
            <div className="space-y-4 max-w-4xl" id="interview_cards_wrapper">
              {filteredInterviews.length > 0 ? (
                filteredInterviews.map((q) => (
                  <ExpandableInterviewCard key={q.id} item={q} />
                ))
              ) : (
                <div className="text-center py-12 text-slate-500 font-sans">
                  <AlertTriangle className="w-10 h-10 mx-auto text-yellow-500 opacity-60 mb-2" />
                  <p className="text-sm font-medium">Siz qidirgan kalit so'z bo'yicha savol-javoblar topilmadi.</p>
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 5: PROJECTS SECTION */}
        {activeTab === "projects" && (
          <div className="space-y-6 animate-fadeIn" id="projects_tab_pane">
            <div className="pb-4 border-b border-gray-200 dark:border-zinc-800">
              <h1 className="text-2xl sm:text-3xl font-sans font-extrabold text-slate-900 dark:text-white">Amaliy Loyihalar & Mini-Specs</h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400">Junior darajadan Senior darajagacha portfolio yig'ishga loyiq dars loyihalari</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" id="projects_list_grid">
              {projectSpecs.map((proj) => {
                const isCompleted = user.completedProjects.includes(proj.id);

                return (
                  <div 
                    key={proj.id}
                    className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[9px] bg-slate-100 dark:bg-zinc-850 px-2 py-0.5 rounded font-bold uppercase">{proj.difficulty}</span>
                          <h3 className="font-sans font-bold text-lg text-slate-900 dark:text-white pt-1">{proj.title}</h3>
                        </div>
                        <span className="text-xs font-mono font-extrabold text-yellow-600 dark:text-yellow-400">+{proj.points} XP</span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 leading-relaxed font-sans">{proj.description}</p>

                      {/* Key features checklist */}
                      <div className="space-y-1.5 pt-2">
                        <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Loyiha Asosiy Talablari:</span>
                        {proj.features.map((feat, fidx) => (
                          <div key={fidx} className="flex items-center text-xs font-sans text-slate-700 dark:text-zinc-300">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>

                      {/* Advanced components schema display if exists */}
                      {proj.databaseSchema && (
                        <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl space-y-1">
                          <span className="text-[10px] text-slate-500 font-mono tracking-wider uppercase block">Tavsiat etilgan DB Schema / Architecture:</span>
                          <pre className="text-[10px] font-mono text-zinc-300 leading-relaxed max-w-full overflow-x-auto whitespace-pre-wrap">{proj.databaseSchema}</pre>
                        </div>
                      )}

                      {/* Steps overview */}
                      <div className="pt-2">
                        <span className="text-[10px] font-mono text-slate-400 tracking-wider uppercase font-bold block mb-1">Amaliy qadamlar:</span>
                        <div className="text-xs text-slate-700 dark:text-zinc-300 space-y-1 pl-1">
                          {proj.steps.map((st, sidx) => (
                            <div key={sidx} className="font-sans">{st}</div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Submit project action */}
                    <div className="pt-6 mt-4 border-t border-slate-100 dark:border-zinc-800">
                      {isCompleted ? (
                        <div className="w-full text-center bg-green-100 text-green-900 dark:bg-green-950/20 dark:text-green-400 py-2.5 rounded-xl text-xs font-bold font-sans">
                          Siz ushbu loyihani topshirgansiz va qabul qilingan! ✅
                        </div>
                      ) : submittingProjectId === proj.id ? (
                        <div className="bg-slate-50 dark:bg-zinc-950 p-4 rounded-xl border border-yellow-500/30 space-y-3.5 text-xs animate-fadeIn text-left">
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono uppercase text-zinc-400 font-bold block">Github Repozitoriy Havolasi:</label>
                            <input 
                              type="url" 
                              value={projectGithubUrl}
                              onChange={(e) => setProjectGithubUrl(e.target.value)}
                              placeholder="https://github.com/profile/my-python-project"
                              className="w-full text-xs font-sans bg-white dark:bg-zinc-900 px-3 py-2 rounded-lg outline-none border border-slate-200 dark:border-zinc-800 focus:ring-1 focus:ring-yellow-500 text-slate-900 dark:text-white"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-mono uppercase text-zinc-400 font-bold block">Izoh yoki Qisqacha Kod matni (Ixtiyoriy):</label>
                            <textarea 
                              value={projectNotes}
                              onChange={(e) => setProjectNotes(e.target.value)}
                              rows={2}
                              placeholder="Loyiha haqida biron izoh yoki qisqacha ma'lumot qoldiring..."
                              className="w-full text-xs font-sans bg-white dark:bg-zinc-900 px-3 py-2 rounded-lg outline-none border border-slate-200 dark:border-zinc-800 focus:ring-1 focus:ring-yellow-500 text-slate-900 dark:text-white resize-none"
                            />
                          </div>

                          <div className="flex gap-2.5 pt-1">
                            <button
                              onClick={() => {
                                setSubmittingProjectId(null);
                                setProjectGithubUrl("");
                                setProjectNotes("");
                              }}
                              className="w-1/2 text-center bg-slate-200 hover:bg-slate-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 py-2 rounded-lg text-[11px] font-bold transition-colors cursor-pointer"
                            >
                              Bekor Qilish
                            </button>
                            <button
                              onClick={() => {
                                if (!projectGithubUrl.trim() || !projectGithubUrl.toLowerCase().includes("github.com/")) {
                                  alert("Iltimos, haqiqiy Github repozitoriya havolasini kiriting (masalan: https://github.com/user/repo).");
                                  return;
                                }
                                const updatedProj = [...user.completedProjects, proj.id];
                                const updatedXp = user.xp + proj.points;
                                saveUserProgress({
                                  ...user,
                                  completedProjects: updatedProj,
                                  xp: updatedXp
                                });
                                setSubmittingProjectId(null);
                                setProjectGithubUrl("");
                                setProjectNotes("");
                                alert(`Tabriklaymiz! '${proj.title}' loyihasi muvaffaqiyatli topshirildi va siz +${proj.points} XP ballga ega bo'ldingiz! 🎉`);
                              }}
                              className="w-1/2 text-center bg-yellow-500 hover:bg-yellow-600 text-slate-950 py-2 rounded-lg text-[11px] font-bold transition-colors cursor-pointer"
                            >
                              Yuborish & Tasdiqlash
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setSubmittingProjectId(proj.id);
                            setProjectGithubUrl("");
                            setProjectNotes("");
                          }}
                          className="w-full text-center bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
                        >
                          Loyihani Topshirish (Submit spec)
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 7: DASHBOARD PROFILE AND CERTIFICATE GENERATOR */}
        {activeTab === "dashboard" && (
          <div className="space-y-8 animate-fadeIn" id="dashboard_tab_pane">
            <div className="pb-4 border-b border-gray-200 dark:border-zinc-800">
              <h1 className="text-2xl sm:text-3xl font-sans font-extrabold text-slate-900 dark:text-white">Kabinetingiz & Statistika</h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400">O'quv ko'rsatkichlaringiz, yutuqlar, skill kartasi va olingan guvohnoma</p>
            </div>

            {/* Profile Grid summary card */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              
              {/* Profile details Left card (1/4 width) */}
              <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm text-center space-y-4">
                <div className="w-16 h-16 bg-yellow-500 text-slate-950 rounded-2xl flex items-center justify-center text-2xl font-serif font-bold mx-auto shadow-inner">
                  {user.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-sans font-bold text-lg text-slate-900 dark:text-white">{user.name}</h3>
                  <p className="text-xs text-zinc-400 font-mono">{user.email || "fsoyilov@gmail.com"}</p>
                </div>
                <div className="pt-2.5 border-t border-slate-100 dark:border-zinc-850 flex items-center justify-center space-x-4">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-mono tracking-widest block">Streak</span>
                    <span className="text-sm font-bold text-orange-500">{user.streak} kun</span>
                  </div>
                  <div className="h-6 w-[1px] bg-slate-200 dark:bg-zinc-800"></div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-mono tracking-widest block">Jami XP</span>
                    <span className="text-sm font-bold text-yellow-500">{user.xp} XP</span>
                  </div>
                </div>
              </div>

              {/* Progress Radar/Skills card & details (2/4 width) */}
              <div className="md:col-span-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="font-sans font-bold text-sm text-slate-900 dark:text-white">Sizning Ko'nikmalar Radari (Skills Map)</h3>
                
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6" id="skills_radar_container">
                  {/* Dynamic mock radar drawn with pure high fidelity SVGs */}
                  <div className="relative w-40 h-40 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      {/* background circles */}
                      <circle cx="50" cy="50" r="40" fill="none" className="stroke-slate-200 dark:stroke-zinc-800" strokeWidth="1" />
                      <circle cx="50" cy="50" r="28" fill="none" className="stroke-slate-200 dark:stroke-zinc-800" strokeWidth="1" />
                      <circle cx="50" cy="50" r="16" fill="none" className="stroke-slate-200 dark:stroke-zinc-800" strokeWidth="1" />
                      
                      {/* Cross axes */}
                      <line x1="10" y1="50" x2="90" y2="50" className="stroke-slate-200 dark:stroke-zinc-800" strokeWidth="0.5" />
                      <line x1="50" y1="10" x2="50" y2="90" className="stroke-slate-200 dark:stroke-zinc-800" strokeWidth="0.5" />

                      {/* Radar area points */}
                      {/* Points mapping: Basics(Top), OOP(Right), API(Bottom), Algorithms(Left) */}
                      {(() => {
                        const top = 50 - ((user.skillsRadar["Asoslar"] || 0) * 0.4);
                        const right = 50 + ((user.skillsRadar["OOP"] || 0) * 0.4);
                        const bottom = 50 + ((user.skillsRadar["Web API"] || 0) * 0.4);
                        const left = 50 - ((user.skillsRadar["Algoritmlar"] || 10) * 0.4);
                        
                        return (
                          <polygon 
                            points={`50,${top} ${right},50 50,${bottom} ${left},50`}
                            fill="rgba(234, 179, 8, 0.25)"
                            stroke="rgba(234, 179, 8, 0.8)"
                            strokeWidth="1.5"
                          />
                        );
                      })()}
                    </svg>
                  </div>

                  {/* Skills stats legend table */}
                  <div className="flex-1 space-y-2.5 w-full text-xs">
                    {Object.entries(user.skillsRadar).map(([k, val]) => (
                      <div key={k} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="font-sans font-semibold text-slate-700 dark:text-zinc-300">{k}</span>
                          <span className="font-mono font-bold text-yellow-500">{val}%</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-yellow-500 h-full" style={{ width: `${val}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Achievements details Right card (1/4 width) */}
              <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="font-sans font-bold text-sm text-slate-900 dark:text-white">Olingan Yutuqlar ({user.achievements.length})</h3>
                
                <div className="space-y-3 max-h-[160px] overflow-y-auto pr-1">
                  {user.achievements.length > 0 ? (
                    achievementsList.filter(ach => user.achievements.includes(ach.id)).map(ach => (
                      <div key={ach.id} className="flex items-center space-x-2.5 p-1.5 bg-slate-50 dark:bg-zinc-950 rounded-xl border border-slate-100 dark:border-zinc-850">
                        <div className="bg-yellow-100 dark:bg-yellow-950 text-yellow-600 dark:text-yellow-400 p-1 rounded-lg flex-shrink-0">
                          <Award className="w-4 h-4" />
                        </div>
                        <div className="text-[11px] leading-tight font-sans">
                          <strong className="block text-slate-950 dark:text-zinc-100">{ach.title}</strong>
                          <span className="text-gray-400 text-[10px] block">{ach.desc}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-xs text-gray-500">
                      Hali hech qanday yutuq olinmagan.
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Guvohnoma / Certificate Display area */}
            <div className="space-y-4">
              <h2 className="text-lg font-sans font-extrabold text-slate-900 dark:text-white">Guvohnomalar & Sertifikatlar Tizimi</h2>
              
              {user.certificateEarned ? (
                <Certificate userName={user.name} />
              ) : (
                <div className="p-6 bg-white dark:bg-zinc-900 border border-dashed border-slate-300 dark:border-zinc-800 rounded-3xl text-center space-y-4">
                  <FileBadge className="w-12 h-12 text-yellow-500/40 dark:text-yellow-400/20 mx-auto animate-pulse" />
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-slate-950 dark:text-white">Rasmiy Python Sertifikati Qulflangan 🔒</h3>
                    <p className="text-xs text-slate-505 dark:text-zinc-400 max-w-lg mx-auto leading-relaxed">
                      Kurs sertifikatini faollashtirish uchun barcha syllabus darslarini muvaffaqiyatli yakunlang hamda kodingizni auto-grade tizimida tekshirib o'ting.
                    </p>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-[11px] font-mono text-slate-400">
                    <span>Darslar: {user.completedLessons.length} / {coursesList.reduce((sum, c) => sum + c.modules.reduce((mSum, m) => mSum + m.lessons.length, 0), 0)} ta bajarilgan</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}



      </main>

      {/* Floating AI Chatbot Mentor widget */}
      <AIChatbot />



      {/* Sticky footer visual indicator */}
      <footer className="border-t border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-6 text-center text-xs dark:text-zinc-500 text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-sans font-medium">&copy; {new Date().getFullYear()} PySchool. Toshkent, O'zbekiston. Barcha huquqlar himoyalangan.</p>
          <div className="flex space-x-6">
            <span className="cursor-pointer hover:underline">Foydalanish shartlari</span>
            <span className="cursor-pointer hover:underline">Maxfiylik siyosati</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

// Separate helper component for interactive QA cards to avoid massive redundant states inside App
interface ExpandableInterviewCardProps {
  item: InterviewQuestion;
}

const ExpandableInterviewCard: React.FC<ExpandableInterviewCardProps> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm transition-all duration-200 animate-fadeIn"
      id={`qa_card_${item.id}`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left flex justify-between items-start gap-3 focus:outline-none cursor-pointer"
      >
        <div className="space-y-1.5">
          <span className="text-[9px] bg-slate-100 dark:bg-zinc-800 px-2 py-0.5 rounded font-mono font-bold uppercase text-yellow-600 dark:text-yellow-400">
            {item.category}
          </span>
          <h3 className="font-sans font-bold text-sm sm:text-base text-slate-900 dark:text-white leading-snug">
            {item.question}
          </h3>
        </div>
        <span className="text-slate-400 p-1 bg-slate-50 dark:bg-zinc-800 rounded-lg flex-shrink-0">
          {isOpen ? <ChevronDown className="w-5 h-5 text-yellow-500" /> : <ChevronRight className="w-5 h-5" />}
        </span>
      </button>

      {isOpen && (
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-zinc-800 space-y-4 animate-slideDown leading-relaxed text-xs sm:text-sm text-slate-700 dark:text-zinc-300 font-sans">
          
          <div className="whitespace-pre-wrap">{item.answer}</div>

          {item.codeExample && (
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-wider text-slate-500 block uppercase font-bold">Misol uchun Python kodi (Usage example):</span>
              <pre className="p-3 bg-slate-950 border border-slate-800 text-yellow-200 font-mono text-xs overflow-x-auto rounded-xl shadow-inner leading-relaxed">
                <code>{item.codeExample}</code>
              </pre>
            </div>
          )}

          <div className="bg-yellow-50 dark:bg-yellow-950/25 p-3.5 border-l-4 border-yellow-500 rounded-r-xl text-xs font-sans text-yellow-904 dark:text-yellow-401 flex items-start space-x-2">
            <Sparkles className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5 animate-spin" />
            <div>
              <strong className="block mb-0.5 text-slate-900 dark:text-yellow-400 text-[11px] font-sans">Mentor tavsiyasi (Best Practice tip):</strong>
              <span>Ushbu mavzuda intervyuda gapirganda, uning xotira unumdorligi yoki asinxron arxitekturaga bog'liqlik kesh holatlarini (Cache constraints) eslatib o'tish sizni professional qilib ko'rsatadi!</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
