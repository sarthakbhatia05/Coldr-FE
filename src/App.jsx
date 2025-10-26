import { useState, useEffect } from 'react'
import './App.css'

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
      // Application data (from form)
      formDataToSend.append('email', applicationData.email)
      formDataToSend.append('recipientName', applicationData.recipientName)
      formDataToSend.append('company', applicationData.company)
      formDataToSend.append('role', applicationData.role)
      formDataToSend.append('resume', file)

      const response = await fetch('http://localhost:5000/api/email/send', {
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
      setMessage({ type: 'error', text: 'Network error. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const resetAll = () => {
    setResumeFile(null)
    setProfileData({ name: '', phoneNumber: '', position: '', skills: '', experience: '' })
    setApplicationData({ recipientName: '', email: '', company: '', role: '' })
    setStoredProfiles([])
    setStoredResumes([])
    setSelectedProfileId('')
    setSelectedResumeId('')
    localStorage.removeItem('storedProfiles')
    localStorage.removeItem('storedResumes')
    localStorage.removeItem('resumeData')
    localStorage.removeItem('profileData')
    setStep(1)
    setShowProfileForm(false)
    setMessage({ type: '', text: '' })
  }


  return (
    <div className="app">
      <div className="container">
        <div className="header">
          <div className="title-with-logo">
            <svg className="app-logo" width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="url(#logoGradient)" />

              <path d="M8 8l4 4 4-4" stroke="#ffffff" strokeWidth="2" fill="none" />

              <defs>
                <linearGradient id="logoGradient" x1="0%" y1="100%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>

            <h1>Coldr</h1>
          </div>
          <p>Send professional job applications with ease</p>
        </div>

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        {step === 1 && (
          <div className="step-container">
            <div className="step-header">
              <h2>Step 1: Setup Your Profile</h2>
              <p>Upload your resume and create your professional profile</p>
            </div>

            {/* Resume Upload Section */}
            <div className="upload-section">
              <h3>📄 Upload Resume</h3>
              <div className="upload-area">
                <input
                  type="file"
                  id="resume-upload"
                  accept=".pdf"
                  onChange={handleResumeUpload}
                  className="file-input"
                />
                <label htmlFor="resume-upload" className="upload-label">
                  <div className="upload-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14,2 14,8 20,8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10,9 9,9 8,9" />
                    </svg>
                  </div>
                  <p className="upload-text">
                    <strong>Click to upload</strong> or drag and drop your PDF resume
                  </p>
                  <p className="upload-hint">PDF files only, max 10MB</p>
                </label>
              </div>
            </div>

            {/* Profile Creation Section */}
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
                <div className="profile-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="profile-name">Full Name</label>
                      <input
                        type="text"
                        id="profile-name"
                        name="name"
                        value={profileData.name}
                        onChange={handleProfileChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="profile-phone">Phone Number</label>
                      <input
                        type="tel"
                        id="profile-phone"
                        name="phoneNumber"
                        value={profileData.phoneNumber}
                        onChange={handleProfileChange}
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="profile-position">Default Position/Role</label>
                    <input
                      type="text"
                      id="profile-position"
                      name="position"
                      value={profileData.position}
                      onChange={handleProfileChange}
                      placeholder="e.g., Software Engineer"
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="profile-experience">Years of Experience</label>
                      <input
                        type="text"
                        id="profile-experience"
                        name="experience"
                        value={profileData.experience}
                        onChange={handleProfileChange}
                        placeholder="e.g., 3"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="profile-skills">Key Skills</label>
                      <input
                        type="text"
                        id="profile-skills"
                        name="skills"
                        value={profileData.skills}
                        onChange={handleProfileChange}
                        placeholder="e.g., React, Node.js, Python"
                        required
                      />
                    </div>
                  </div>

                  <div className="profile-actions">
                    <button type="button" onClick={saveProfile} className="save-profile-btn">
                      Save Profile
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowProfileForm(false)}
                      className="cancel-btn"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {profileData.name && !showProfileForm && (
                <div className="profile-preview">
                  <h4>Current Profile:</h4>
                  <div className="profile-info">
                    <p><strong>Name:</strong> {profileData.name}</p>
                    <p><strong>Position:</strong> {profileData.position}</p>
                    <p><strong>Experience:</strong> {profileData.experience} years</p>
                    <p><strong>Skills:</strong> {profileData.skills}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Continue Button */}
            {resumeFile && profileData.name && (
              <div className="continue-section">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="continue-btn"
                >
                  Continue to Applications
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="step-container">
            <div className="step-header">
              <h2>Step 2: Application Details</h2>
              <p>Fill in the job-specific details to send your application</p>
            </div>

            {/* Profile & Resume Selection */}
            <div className="selection-section">
              <div className="selection-header">
                <h3>Select Profile & Resume</h3>
                <p>Choose from your saved profiles and resumes, or add new ones</p>
              </div>

              <div className="selection-grid">
                {/* Profile Selection */}
                <div className="selection-group">
                  <label className="selection-label">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    Profile
                  </label>
                  <div className="dropdown-container profile-dropdown-container">
                    <button
                      className="dropdown-trigger"
                      onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    >
                      <span>
                        {profileData.name ? `${profileData.name} • ${profileData.position}` : 'Select Profile'}
                      </span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6,9 12,15 18,9" />
                      </svg>
                    </button>

                    {showProfileDropdown && (
                      <div className="dropdown-menu">
                        <div className="dropdown-section">
                          <div className="dropdown-header">Profiles</div>
                          {storedProfiles.map(profile => (
                            <div key={profile.id} className="dropdown-item">
                              <div className="dropdown-item-content" onClick={() => handleProfileSelect(profile.id)}>
                                <div className="dropdown-item-name">
                                  {profile.name}
                                  {selectedProfileId === profile.id && (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="selection-tick">
                                      <polyline points="20,6 9,17 4,12" />
                                    </svg>
                                  )}
                                </div>
                                <div className="dropdown-item-details">{profile.position} • {profile.experience} years exp</div>
                              </div>
                              <button
                                className="dropdown-delete"
                                onClick={() => deleteProfile(profile.id)}
                                title="Delete profile"
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <polyline points="3,6 5,6 21,6" />
                                  <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2" />
                                </svg>
                              </button>
                            </div>
                          ))}
                          <button
                            className="dropdown-add"
                            onClick={() => {
                              setShowProfileForm(true)
                              setShowProfileDropdown(false)
                            }}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <line x1="12" y1="5" x2="12" y2="19" />
                              <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                            Add New Profile
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Resume Selection */}
                <div className="selection-group">
                  <label className="selection-label">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14,2 14,8 20,8" />
                    </svg>
                    Resume
                  </label>
                  <div className="dropdown-container resume-dropdown-container">
                    <button
                      className="dropdown-trigger"
                      onClick={() => setShowResumeDropdown(!showResumeDropdown)}
                    >
                      <span>
                        {resumeFile ? resumeFile.name : 'Select Resume'}
                      </span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6,9 12,15 18,9" />
                      </svg>
                    </button>

                    {showResumeDropdown && (
                      <div className="dropdown-menu">
                        <div className="dropdown-section">
                          <div className="dropdown-header">Resumes</div>
                          {storedResumes.map(resume => (
                            <div key={resume.id} className="dropdown-item">
                              <div className="dropdown-item-content" onClick={() => handleResumeSelect(resume.id)}>
                                <div className="dropdown-item-name">
                                  {resume.name}
                                  {selectedResumeId === resume.id && (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="selection-tick">
                                      <polyline points="20,6 9,17 4,12" />
                                    </svg>
                                  )}
                                </div>
                                <div className="dropdown-item-details">{(resume.size / 1024 / 1024).toFixed(2)} MB</div>
                              </div>
                              <button
                                className="dropdown-delete"
                                onClick={() => deleteResume(resume.id)}
                                title="Delete resume"
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <polyline points="3,6 5,6 21,6" />
                                  <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2" />
                                </svg>
                              </button>
                            </div>
                          ))}
                          <label className="dropdown-add" htmlFor="resume-upload-new">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <line x1="12" y1="5" x2="12" y2="19" />
                              <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                            Upload New Resume
                            <input
                              type="file"
                              id="resume-upload-new"
                              accept=".pdf"
                              onChange={handleResumeUpload}
                              style={{ display: 'none' }}
                            />
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Form for Step 2 */}
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

                <div className="profile-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="profile-name-new">Full Name</label>
                      <input
                        type="text"
                        id="profile-name-new"
                        name="name"
                        value={profileData.name}
                        onChange={handleProfileChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="profile-phone-new">Phone Number</label>
                      <input
                        type="tel"
                        id="profile-phone-new"
                        name="phoneNumber"
                        value={profileData.phoneNumber}
                        onChange={handleProfileChange}
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="profile-position-new">Default Position/Role</label>
                    <input
                      type="text"
                      id="profile-position-new"
                      name="position"
                      value={profileData.position}
                      onChange={handleProfileChange}
                      placeholder="e.g., Software Engineer"
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="profile-experience-new">Years of Experience</label>
                      <input
                        type="text"
                        id="profile-experience-new"
                        name="experience"
                        value={profileData.experience}
                        onChange={handleProfileChange}
                        placeholder="e.g., 3"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="profile-skills-new">Key Skills</label>
                      <input
                        type="text"
                        id="profile-skills-new"
                        name="skills"
                        value={profileData.skills}
                        onChange={handleProfileChange}
                        placeholder="e.g., React, Node.js, Python"
                        required
                      />
                    </div>
                  </div>

                  <div className="profile-actions">
                    <button type="button" onClick={saveProfile} className="save-profile-btn">
                      Save Profile
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowProfileForm(false)}
                      className="cancel-btn"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Simplified Application Form */}
            <form onSubmit={handleSubmit} className="application-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="recipientName">Recipient Name</label>
                  <input
                    type="text"
                    id="recipientName"
                    name="recipientName"
                    value={applicationData.recipientName}
                    onChange={handleApplicationChange}
                    placeholder="Hiring manager's name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Recipient Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={applicationData.email}
                    onChange={handleApplicationChange}
                    placeholder="Enter your email address"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="company">Company Name</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={applicationData.company}
                    onChange={handleApplicationChange}
                    placeholder="Enter company name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="role">Position/Role</label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    value={applicationData.role}
                    onChange={handleApplicationChange}
                    placeholder="e.g., Software Engineer"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="send-btn" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="spinner"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22,2 15,22 11,13 2,9 22,2" />
                    </svg>
                    Send Application
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
