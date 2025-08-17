
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import CommunityForum from './components/CommunityForum';
import SettingsPage from './components/SettingsPage';
import PostSkillModal from './components/PostSkillModal';
import EditProfileModal from './components/EditProfileModal';
import PostQuestionModal from './components/PostQuestionModal';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import MatchesPage from './components/MatchesPage';
import NotificationsPage from './components/NotificationsPage';
import LiveSessionPage from './components/LiveSessionPage';
import RequestSessionModal from './components/RequestSessionModal';
import OnboardingPage from './components/OnboardingPage';
import QuestionDetailPage from './components/QuestionDetailPage';
import { User, Skill, Page, ForumQuestion, Match, Notification, MatchStatus, Answer, Education } from './components/types';
import { MOCK_SKILLS, MOCK_USERS, MOCK_FORUM_QUESTIONS, MOCK_BADGES, MOCK_MATCHES, MOCK_NOTIFICATIONS } from './constants';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const savedMode = localStorage.getItem('yolearn-dark-mode');
      if (savedMode !== null) {
        return JSON.parse(savedMode);
      }
      return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
    } catch {
      return false;
    }
  });

  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  
  // Modal states
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isPostQuestionModalOpen, setIsPostQuestionModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  // Data states
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [skills, setSkills] = useState<Skill[]>(MOCK_SKILLS);
  const [skillToEdit, setSkillToEdit] = useState<Skill | null>(null);
  const [skillToRequest, setSkillToRequest] = useState<Skill | null>(null);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [questions, setQuestions] = useState<ForumQuestion[]>(MOCK_FORUM_QUESTIONS);
  const [matches, setMatches] = useState<Match[]>(MOCK_MATCHES);
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [activeSession, setActiveSession] = useState<Match | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<ForumQuestion | null>(null);


  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    try {
      localStorage.setItem('yolearn-dark-mode', JSON.stringify(isDarkMode));
    } catch (error) {
      console.error("Could not save dark mode preference to localStorage:", error);
    }
  }, [isDarkMode]);

  const handleLogin = (email: string, password: string): void => {
    const userExists = users.find(u => u.email === email);
    
    if (!userExists) {
      alert("No account found with this email. Please register.");
      setShowRegister(true);
    } else if (userExists.password !== password) {
      alert("Incorrect password. Please try again.");
    } else {
      setLoggedInUser(userExists);
      setIsAuthenticated(true);
      setCurrentPage('dashboard');
      setShowRegister(false);
    }
  };

  const handleRegister = (newUserData: Pick<User, 'name' | 'email' | 'password'>) => {
    if (users.some(u => u.email === newUserData.email)) {
      alert("An account with this email already exists.");
      return;
    }
    const newUser: User = {
      name: newUserData.name,
      email: newUserData.email,
      password: newUserData.password,
      id: `user-${Date.now()}`,
      profilePhoto: `https://picsum.photos/seed/${newUserData.name}/200`,
      skillsCount: 0,
      badgesCount: 0,
      year: 1,
      department: 'Undeclared',
      bio: '',
      dateJoined: new Date().toISOString(),
      education: {
        degree: { institution: '', degreeName: '', major: '', cgpa: '', about: '' },
        intermediate: { institution: '', board: '', cgpa: '' },
        schooling: { institution: '', board: '', marks: '' },
      },
    };
    setUsers(prev => [...prev, newUser]);
    setLoggedInUser(newUser);
    setIsAuthenticated(true);
    setShowOnboarding(true);
  };
  
  const handleCompleteOnboarding = (details: { department: string; year: number; bio: string; education: Education; }) => {
    if (!loggedInUser) return;
    const updatedUser = { 
        ...loggedInUser, 
        department: details.department,
        year: details.year,
        bio: details.bio,
        education: details.education
    };
    setLoggedInUser(updatedUser);
    setUsers(prevUsers => prevUsers.map(u => u.id === updatedUser.id ? updatedUser : u));
    setShowOnboarding(false);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoggedInUser(null);
    setShowRegister(false); 
    setShowOnboarding(false);
    setCurrentPage('dashboard');
  };

  const handleDeleteUser = () => {
    if (!loggedInUser) return;
    if (confirm('Are you sure you want to permanently delete your account? This action cannot be undone.')) {
        setUsers(prev => prev.filter(u => u.id !== loggedInUser.id));
        handleLogout();
    }
  };

  const toggleDarkMode = useCallback(() => setIsDarkMode(prev => !prev), []);

  const openPostSkillModal = () => {
    setSkillToEdit(null);
    setIsSkillModalOpen(true);
  };

  const openEditSkillModal = (skill: Skill) => {
    setSkillToEdit(skill);
    setIsSkillModalOpen(true);
  };

  const handlePostSkill = useCallback((newSkillData: Omit<Skill, 'id' | 'user' | 'datePosted'>) => {
    if (!loggedInUser) return;
    if (skillToEdit) {
      setSkills(prevSkills => prevSkills.map(s => s.id === skillToEdit.id ? { ...s, ...newSkillData } : s));
    } else {
      const skillToAdd: Skill = {
        ...newSkillData,
        id: `skill-${Date.now()}`,
        user: loggedInUser,
        datePosted: new Date().toISOString(),
      };
      setSkills(prevSkills => [skillToAdd, ...prevSkills]);
    }
    setIsSkillModalOpen(false);
    setSkillToEdit(null);
  }, [loggedInUser, skillToEdit]);
  
  const handleUpdateProfile = (updatedUser: User) => {
    setLoggedInUser(updatedUser);
    setUsers(prevUsers => prevUsers.map(u => u.id === updatedUser.id ? updatedUser : u));
    setIsEditProfileModalOpen(false);
  };

  const handleProfilePictureChange = (file: File) => {
    if (!loggedInUser) return;
    if (!file.type.startsWith('image/')) {
        alert('Please select an image file.');
        return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
        const newPhotoUrl = e.target?.result as string;
        if (newPhotoUrl) {
            const updatedUser = { ...loggedInUser, profilePhoto: newPhotoUrl };
            setLoggedInUser(updatedUser);
            setUsers(prev => prev.map(u => u.id === loggedInUser.id ? updatedUser : u));
        }
    };
    reader.readAsDataURL(file);
  };

  const handlePostQuestion = (question: Omit<ForumQuestion, 'id' | 'author' | 'datePosted' | 'answers'>) => {
    if (!loggedInUser) return;
    const newQuestion: ForumQuestion = {
        ...question,
        id: `question-${Date.now()}`,
        author: loggedInUser,
        datePosted: new Date().toISOString(),
        answers: [],
    };
    setQuestions(prev => [newQuestion, ...prev]);
    setIsPostQuestionModalOpen(false);
  };

  const handleSelectQuestion = (question: ForumQuestion) => {
    setSelectedQuestion(question);
    setCurrentPage('questionDetail');
  };
  
  const handlePostAnswer = (questionId: string, content: string) => {
    if (!loggedInUser) return;
    const newAnswer: Answer = {
      id: `ans-${Date.now()}`,
      content,
      author: loggedInUser,
      datePosted: new Date().toISOString(),
    };
    const updatedQuestions = questions.map(q => {
      if (q.id === questionId) {
        return { ...q, answers: [...q.answers, newAnswer] };
      }
      return q;
    });
    setQuestions(updatedQuestions);
    setSelectedQuestion(updatedQuestions.find(q => q.id === questionId) || null);
  };

  const openRequestModal = (skill: Skill) => {
    setSkillToRequest(skill);
    setIsRequestModalOpen(true);
  };

  const handleSendRequest = (message: string) => {
    if (!loggedInUser || !skillToRequest) return;
    const newMatch: Match = {
      id: `match-${Date.now()}`,
      learner: loggedInUser,
      mentor: skillToRequest.user,
      skill: skillToRequest,
      status: MatchStatus.PENDING,
      requestMessage: message,
      dateRequested: new Date().toISOString(),
      dateUpdated: new Date().toISOString(),
    };
    setMatches(prev => [newMatch, ...prev]);
    setNotifications(prev => [{
      id: `notif-${Date.now()}`,
      text: `${loggedInUser.name} sent you a request for "${skillToRequest.skillName}".`,
      time: 'Just now',
      read: false,
    }, ...prev]);
    setIsRequestModalOpen(false);
    setSkillToRequest(null);
  };

  const handleAcceptRequest = (matchId: string) => {
    setMatches(prev => prev.map(m => m.id === matchId ? {...m, status: MatchStatus.ACCEPTED, dateUpdated: new Date().toISOString()} : m));
  };
  
  const handleDeclineRequest = (matchId: string) => {
    setMatches(prev => prev.map(m => m.id === matchId ? {...m, status: MatchStatus.DECLINED, dateUpdated: new Date().toISOString()} : m));
  };

  const handleJoinSession = (match: Match) => {
    setActiveSession(match);
    setCurrentPage('liveSession');
  };

  const renderPage = () => {
    if (!loggedInUser) return null;

    const userSkills = skills.filter(skill => skill.user.id === loggedInUser.id);
    const userBadges = MOCK_BADGES.slice(0, loggedInUser.badgesCount);
    const completedSessionsCount = matches.filter(m => (m.learner.id === loggedInUser.id || m.mentor.id === loggedInUser.id) && m.status === MatchStatus.COMPLETED).length;

    switch (currentPage) {
      case 'profile':
        return <Profile user={loggedInUser} userSkills={userSkills} userBadges={userBadges} onEditProfile={() => setIsEditProfileModalOpen(true)} onEditSkill={openEditSkillModal} completedSessionsCount={completedSessionsCount} onProfilePictureChange={handleProfilePictureChange}/>;
      case 'community':
        return <CommunityForum questions={questions} onPostQuestionClick={() => setIsPostQuestionModalOpen(true)} onSelectQuestion={handleSelectQuestion} />;
      case 'questionDetail':
        return selectedQuestion ? <QuestionDetailPage question={selectedQuestion} currentUser={loggedInUser} onPostAnswer={handlePostAnswer} onBack={() => setCurrentPage('community')} /> : null;
      case 'settings':
        return <SettingsPage user={loggedInUser} onUpdateUser={handleUpdateProfile} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} onProfilePictureChange={handleProfilePictureChange} onDeleteUser={handleDeleteUser}/>;
      case 'matches':
        return <MatchesPage currentUser={loggedInUser} matches={matches} onAccept={handleAcceptRequest} onDecline={handleDeclineRequest} onJoinSession={handleJoinSession} />;
      case 'notifications':
        return <NotificationsPage notifications={notifications} />;
      case 'liveSession':
        return activeSession ? <LiveSessionPage session={activeSession} user={loggedInUser} onLeave={() => setCurrentPage('matches')} /> : null;
      case 'dashboard':
      default:
        return <Dashboard skills={skills} loggedInUser={loggedInUser} onPostSkillClick={openPostSkillModal} onRequestSession={openRequestModal} />;
    }
  };

  if (!isAuthenticated || !loggedInUser) {
    return showRegister 
      ? <RegisterPage onSwitchToLogin={() => setShowRegister(false)} onRegister={handleRegister} /> 
      : <LoginPage onSwitchToRegister={() => setShowRegister(true)} onLogin={handleLogin} />;
  }

  if (showOnboarding) {
    return <OnboardingPage 
        user={loggedInUser} 
        onComplete={handleCompleteOnboarding} 
        onProfilePictureChange={handleProfilePictureChange} 
    />;
  }

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <Header
        user={loggedInUser}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        onNavigate={setCurrentPage}
        onLogout={handleLogout}
        currentPage={currentPage}
        unreadNotificationsCount={unreadNotificationsCount}
      />
      <main className="p-4 sm:p-6 lg:p-8">
        {renderPage()}
      </main>
      
      {isSkillModalOpen && (
        <PostSkillModal
          onClose={() => setIsSkillModalOpen(false)}
          onPost={handlePostSkill}
          skillToEdit={skillToEdit}
        />
      )}

      {isEditProfileModalOpen && loggedInUser && (
          <EditProfileModal 
            user={loggedInUser}
            onClose={() => setIsEditProfileModalOpen(false)}
            onSave={handleUpdateProfile}
          />
      )}
      
      {isPostQuestionModalOpen && (
        <PostQuestionModal 
          onClose={() => setIsPostQuestionModalOpen(false)}
          onPost={handlePostQuestion}
        />
      )}

      {isRequestModalOpen && skillToRequest && (
        <RequestSessionModal
          skill={skillToRequest}
          onClose={() => setIsRequestModalOpen(false)}
          onSend={handleSendRequest}
        />
      )}
    </div>
  );
};

export default App;