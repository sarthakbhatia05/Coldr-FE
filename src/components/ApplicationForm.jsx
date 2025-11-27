import React from 'react';

const ApplicationForm = ({
  applicationData,
  handleApplicationChange,
  handleSubmit,
  isLoading,
  jd,
  setJd,
  instructions,
  setInstructions,
  generatedContent,
  setGeneratedContent,
  handleGenerateEmail,
  isGenerating
}) => (
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

    {/* AI Generation Section */}
    <div className="ai-section">
      <div className="form-group">
        <label htmlFor="jd">
          Job Description (Optional)
          <span className="label-hint">Paste the JD here to generate a personalized email</span>
        </label>
        <textarea
          id="jd"
          value={jd}
          onChange={(e) => setJd(e.target.value)}
          placeholder="Paste the job description here..."
          rows="4"
          className="jd-textarea"
        />
      </div>
      <div className="form-group">
        <label htmlFor="instructions">
          Additional Instructions (Optional)
          <span className="label-hint">Any specific instructions for the AI to follow</span>
        </label>
        <textarea
          id="instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="e.g., Keep it formal, mention specific projects, etc..."
          rows="3"
          className="jd-textarea"
        />
      </div>
      <button
        type="button"
        onClick={() => {
          if (!applicationData.recipientName || !applicationData.company) {
            alert("Please enter Recipient Name and Company Name first.");
            return;
          }
          handleGenerateEmail();
        }}
        className="generate-btn"
        disabled={isGenerating}
      >
        {isGenerating ? (
          <>
            <div className="spinner-small"></div>
            Generating...
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 12z" />
              <path d="M21 3v9h-9" />
            </svg>
            Generate Email with AI
          </>
        )}
      </button>
      {(!applicationData.recipientName || !applicationData.company) && (
        <p className="field-hint" style={{ color: 'var(--error-color)', textAlign: 'center' }}>
          * Recipient Name and Company are required for AI generation
        </p>
      )}
    </div>

    {/* Preview & Edit Section */}
    {(generatedContent?.subject || generatedContent?.body) && (
      <div className="preview-section">
        <h4>Preview & Edit Email</h4>
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            value={generatedContent.subject}
            onChange={(e) => setGeneratedContent({ ...generatedContent, subject: e.target.value })}
            placeholder="Email Subject"
          />
        </div>
        <div className="form-group">
          <label htmlFor="body">Email Body</label>
          <div
            className="body-editor"
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => setGeneratedContent({ ...generatedContent, body: e.currentTarget.innerHTML })}
            dangerouslySetInnerHTML={{ __html: generatedContent.body }}
          />
          <p className="preview-hint">Edit the text directly above. It will be sent as HTML.</p>
        </div>
      </div>
    )}

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
);

export default ApplicationForm;
