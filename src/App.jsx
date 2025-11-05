
import { useState, useEffect } from 'react';
import useAuth from './hooks/useAuth';
import './App.css';
import Header from './components/Header';
import SignOutButton from './components/SignOutButton';
import Message from './components/Message';
import ResumeUpload from './components/ResumeUpload';
import ProfileForm from './components/ProfileForm';
import ProfilePreview from './components/ProfilePreview';
import ContinueButton from './components/ContinueButton';
import StepHeader from './components/StepHeader';
import ApplicationForm from './components/ApplicationForm';
import ProfileDropdown from './components/ProfileDropdown';
import ResumeDropdown from './components/ResumeDropdown';
import GoogleLoginModal from './components/GoogleLoginModal';
import MainModal from './components/MainModal';

function App() {
  const [step, setStep] = useState(1) // 1: Upload Resume & Create Profile, 2: Fill Application Details
  const [resumeFile, setResumeFile] = useState(null)
  const [profileData, setProfileData] = useState({
    name: '',
    phoneNumber: '',
    position: '',
    skills: '',
    experience: ''
  })
  const [applicationData, setApplicationData] = useState({
    recipientName: '',
    email: '',
    company: '',
    role: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [showProfileForm, setShowProfileForm] = useState(false)
  const [storedProfiles, setStoredProfiles] = useState([])
  const [storedResumes, setStoredResumes] = useState([])
  const [selectedProfileId, setSelectedProfileId] = useState('')
  const [selectedResumeId, setSelectedResumeId] = useState('')
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [showResumeDropdown, setShowResumeDropdown] = useState(false)

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProfileDropdown && !event.target.closest('.profile-dropdown-container')) {
        setShowProfileDropdown(false)
      }
      if (showResumeDropdown && !event.target.closest('.resume-dropdown-container')) {
        setShowResumeDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showProfileDropdown, showResumeDropdown])

  // Load profiles and resumes from localStorage on component mount
  useEffect(() => {
    const savedProfiles = localStorage.getItem('storedProfiles')
    const savedResumes = localStorage.getItem('storedResumes')

    if (savedProfiles) {
      const profiles = JSON.parse(savedProfiles)
      setStoredProfiles(profiles)
      if (profiles.length > 0) {
        setProfileData(profiles[0])
        setSelectedProfileId(profiles[0].id)
        // Pre-populate the role field with the first profile's position
        setApplicationData(prev => ({
          ...prev,
          role: profiles[0].position
        }))
      }
    }

    if (savedResumes) {
      const resumes = JSON.parse(savedResumes)
      setStoredResumes(resumes)
      if (resumes.length > 0) {
        setResumeFile(resumes[0])
        setSelectedResumeId(resumes[0].id)
      }
    }

    // Legacy support - migrate old single profile/resume to new format
    const legacyProfile = localStorage.getItem('profileData')
    const legacyResume = localStorage.getItem('resumeData')

    if (legacyProfile && storedProfiles.length === 0) {
      const profile = JSON.parse(legacyProfile)
      const newProfile = { ...profile, id: Date.now().toString() }
      setStoredProfiles([newProfile])
      setProfileData(newProfile)
      setSelectedProfileId(newProfile.id)
      // Pre-populate the role field with the legacy profile's position
      setApplicationData(prev => ({
        ...prev,
        role: newProfile.position
      }))
      localStorage.setItem('storedProfiles', JSON.stringify([newProfile]))
    }

    if (legacyResume && storedResumes.length === 0) {
      const resume = JSON.parse(legacyResume)
      const newResume = { ...resume, id: Date.now().toString() }
      setStoredResumes([newResume])
      setResumeFile(newResume)
      setSelectedResumeId(newResume.id)
      localStorage.setItem('storedResumes', JSON.stringify([newResume]))
    }

    // Move to step 2 if we have both profile and resume
    if ((savedProfiles || legacyProfile) && (savedResumes || legacyResume)) {
      setStep(2)
    }
  }, [])

  const handleResumeUpload = (event) => {
    const file = event.target.files[0]
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader()
      reader.onload = (e) => {
        const resumeData = {
          id: Date.now().toString(),
          name: file.name,
          size: file.size,
          type: file.type,
          data: e.target.result,
          createdAt: new Date().toISOString()
        }

        const updatedResumes = [...storedResumes, resumeData]
        setStoredResumes(updatedResumes)
        setResumeFile(resumeData)
        setSelectedResumeId(resumeData.id)
        localStorage.setItem('storedResumes', JSON.stringify(updatedResumes))

        // Check if profile exists to determine next step
        if (storedProfiles.length > 0) {
          setStep(2)
          setMessage({ type: 'success', text: 'Resume uploaded successfully! Ready to send applications.' })
        } else {
          setMessage({ type: 'success', text: 'Resume uploaded! Now create your profile to continue.' })
        }
      }
      reader.readAsDataURL(file)
    } else {
      setMessage({ type: 'error', text: 'Please upload a PDF file only.' })
    }
  }

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    })
  }

  const handleApplicationChange = (e) => {
    setApplicationData({
      ...applicationData,
      [e.target.name]: e.target.value
    })
  }

  const saveProfile = () => {
    if (!profileData.name || !profileData.phoneNumber || !profileData.position || !profileData.skills || !profileData.experience) {
      setMessage({ type: 'error', text: 'Please fill in all profile fields.' })
      return
    }

    const newProfile = {
      ...profileData,
      id: profileData.id || Date.now().toString(),
      createdAt: profileData.createdAt || new Date().toISOString()
    }

    const updatedProfiles = profileData.id
      ? storedProfiles.map(p => p.id === profileData.id ? newProfile : p)
      : [...storedProfiles, newProfile]

    setStoredProfiles(updatedProfiles)
    setProfileData(newProfile)
    setSelectedProfileId(newProfile.id)
    localStorage.setItem('storedProfiles', JSON.stringify(updatedProfiles))
    setShowProfileForm(false)
    setMessage({ type: 'success', text: 'Profile saved successfully!' })

    // If resume is already uploaded, move to step 2
    if (resumeFile) {
      setStep(2)
    }
  }

  const handleProfileSelect = (profileId) => {
    const profile = storedProfiles.find(p => p.id === profileId)
    if (profile) {
      setProfileData(profile)
      setSelectedProfileId(profileId)
      setShowProfileDropdown(false)
      // Pre-populate the role field with the profile's position
      setApplicationData(prev => ({
        ...prev,
        role: profile.position
      }))
    }
  }

  const handleResumeSelect = (resumeId) => {
    const resume = storedResumes.find(r => r.id === resumeId)
    if (resume) {
      setResumeFile(resume)
      setSelectedResumeId(resumeId)
      setShowResumeDropdown(false)
    }
  }

  const deleteProfile = (profileId) => {
    const updatedProfiles = storedProfiles.filter(p => p.id !== profileId)
    setStoredProfiles(updatedProfiles)
    localStorage.setItem('storedProfiles', JSON.stringify(updatedProfiles))

    if (selectedProfileId === profileId) {
      if (updatedProfiles.length > 0) {
        setProfileData(updatedProfiles[0])
        setSelectedProfileId(updatedProfiles[0].id)
      } else {
        setProfileData({ name: '', phoneNumber: '', position: '', skills: '', experience: '' })
        setSelectedProfileId('')
      }
    }
  }

  const deleteResume = (resumeId) => {
    const updatedResumes = storedResumes.filter(r => r.id !== resumeId)
    setStoredResumes(updatedResumes)
    localStorage.setItem('storedResumes', JSON.stringify(updatedResumes))

    if (selectedResumeId === resumeId) {
      if (updatedResumes.length > 0) {
        setResumeFile(updatedResumes[0])
        setSelectedResumeId(updatedResumes[0].id)
      } else {
        setResumeFile(null)
        setSelectedResumeId('')
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage({ type: '', text: '' })

    try {
      // Convert base64 data back to File
      const byteCharacters = atob(resumeFile.data.split(',')[1])
      const byteNumbers = new Array(byteCharacters.length)
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i)
      }
      const byteArray = new Uint8Array(byteNumbers)
      const file = new File([byteArray], resumeFile.name, { type: resumeFile.type })

      const formDataToSend = new FormData()
      // Profile data (from localStorage)
      formDataToSend.append('name', profileData.name)
      formDataToSend.append('phoneNumber', profileData.phoneNumber)
      formDataToSend.append('position', profileData.position)
      formDataToSend.append('skills', profileData.skills)
      formDataToSend.append('experience', profileData.experience)
      formDataToSend.append('email', applicationData.email)
      formDataToSend.append('recipientName', applicationData.recipientName)
      formDataToSend.append('company', applicationData.company)
      formDataToSend.append('role', applicationData.role)
      formDataToSend.append('resume', file)

      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/email/send`, {
        method: 'POST',
        body: formDataToSend
      })

      const result = await response.json()

      if (result.success) {
        setMessage({ type: 'success', text: 'Email sent successfully! Form cleared and ready for another email.' })
        // Reset only application data, keep profile and resume
        setApplicationData({
          recipientName: '',
          email: '',
          company: '',
          role: ''
        })
        // Don't reset resumeFile or profileData - keep them for another email
        setStep(2) // Stay on step 2 to allow sending another email
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to send email' })
      }
    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', text: 'Network error. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const {
    isAuthenticated,
    setRefreshToken,
    setIsAuthenticated
  } = useAuth();

  // Sign out handler
  const handleSignOut = () => {
    localStorage.removeItem('refresh_token');
    setRefreshToken(null);
    setIsAuthenticated(false);
    setMessage({ type: 'success', text: 'Signed out successfully.' });
  };

  // Google OAuth login handler
  const handleGoogleLogin = () => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    window.location.href = `${apiUrl}/auth/google`;
  };


  if (!isAuthenticated) {
    return (
      <div className="app">
        <GoogleLoginModal onLogin={handleGoogleLogin} />
      </div>
    );
  }

  return (
    <div className="app">
      <Header />
      <SignOutButton onSignOut={handleSignOut} />
      <div className="container">
        <MainModal>
          <Message type={message.type} text={message.text} />
          {step === 1 && (
            <>
              <StepHeader step={step} />
              <div className="scrollable-step-content">
                <ResumeUpload handleResumeUpload={handleResumeUpload} />
                <div className="profile-section">
                  <div className="profile-header">
                    <h3>👤 Create Your Profile</h3>
                    <p>This information will be used in all your job applications</p>
                    {!showProfileForm && (
                      <button
                        type="button"
                        onClick={() => setShowProfileForm(true)}
                        className="create-profile-btn"
                      >
                        {profileData.name ? 'Edit Profile' : 'Create Profile'}
                      </button>
                    )}
                  </div>
                  {showProfileForm && (
                    <ProfileForm
                      profileData={profileData}
                      handleProfileChange={handleProfileChange}
                      saveProfile={saveProfile}
                      setShowProfileForm={setShowProfileForm}
                    />
                  )}
                  {profileData.name && !showProfileForm && (
                    <ProfilePreview profileData={profileData} />
                  )}
                </div>
                {resumeFile && profileData.name && (
                  <ContinueButton onClick={() => setStep(2)} />
                )}
              </div>
            </>
          )}
          {step === 2 && (
            <div className="step-container">
              <StepHeader step={step} />
              <div className="selection-section">
                <div className="selection-header">
                  <h3>Select Profile & Resume</h3>
                  <p>Choose from your saved profiles and resumes, or add new ones</p>
                </div>
                <div className="selection-grid">
                  <div className="selection-group">
                    <label className="selection-label">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      Profile
                    </label>
                    <ProfileDropdown
                      storedProfiles={storedProfiles}
                      selectedProfileId={selectedProfileId}
                      showProfileDropdown={showProfileDropdown}
                      setShowProfileDropdown={setShowProfileDropdown}
                      handleProfileSelect={handleProfileSelect}
                      deleteProfile={deleteProfile}
                      setShowProfileForm={setShowProfileForm}
                      setProfileData={setProfileData}
                    />
                  </div>
                  <div className="selection-group">
                    <label className="selection-label">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14,2 14,8 20,8" />
                      </svg>
                      Resume
                    </label>
                    <ResumeDropdown
                      storedResumes={storedResumes}
                      selectedResumeId={selectedResumeId}
                      showResumeDropdown={showResumeDropdown}
                      setShowResumeDropdown={setShowResumeDropdown}
                      handleResumeSelect={handleResumeSelect}
                      deleteResume={deleteResume}
                      handleResumeUpload={handleResumeUpload}
                    />
                  </div>
                </div>
              </div>
              {showProfileForm && (
                <div className="profile-form-section">
                  <div className="profile-form-header">
                    <h3>Create New Profile</h3>
                    <button
                      type="button"
                      onClick={() => setShowProfileForm(false)}
                      className="close-form-btn"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                  <ProfileForm
                    profileData={profileData}
                    handleProfileChange={handleProfileChange}
                    saveProfile={saveProfile}
                    setShowProfileForm={setShowProfileForm}
                  />
                </div>
              )}
              <ApplicationForm
                applicationData={applicationData}
                handleApplicationChange={handleApplicationChange}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
              />
            </div>
          )}
        </MainModal>
      </div>
    </div>
  );
}

export default App
