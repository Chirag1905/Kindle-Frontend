"use client";

import React, { useState, useEffect } from "react";
import { ExamPaperType } from "./ExamPaperTypes";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";

interface ExamPaperFormProps {
  examPaper: ExamPaperType | null;
  onSave: (updatedData: Partial<ExamPaperType>) => void;
  onCancel: () => void;
}

const ExamPaperForm: React.FC<ExamPaperFormProps> = ({
  examPaper,
  onSave,
  onCancel,
}) => {
  const [activeTab, setActiveTab] = useState("details");
  const [formData, setFormData] = useState({
    examName: "",
    subjectName: "",
    examType: "",
    batchName: "",
    duration: 0,
    maxMarks: 0,
    status: "DRAFT",
  });
  const [paperContent, setPaperContent] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  useEffect(() => {
    if (examPaper) {
      setFormData({
        examName: examPaper.examName || "",
        subjectName: examPaper.subjectName || "",
        examType: examPaper.examType || "",
        batchName: examPaper.batchName || "",
        duration: examPaper.duration || 0,
        maxMarks: examPaper.maxMarks || 0,
        status: examPaper.status || "DRAFT",
      });
    }
  }, [examPaper]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "duration" || name === "maxMarks" ? parseInt(value) || 0 : value,
    }));
  };

  const handleStatusChange = (status: string) => {
    setFormData((prev) => ({
      ...prev,
      status,
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setPaperContent(content);
      };
      reader.readAsText(file);
    }
  };

  const handleSave = () => {
    const updatedData = {
      ...formData,
      content: paperContent,
    } as Partial<ExamPaperType>;
    onSave(updatedData);
  };

  const loadTemplate = () => {
    const template = `EXAM PAPER TEMPLATE

Institution: [Institution Name]
Subject: ${formData.subjectName}
Exam: ${formData.examName}
Duration: ${formData.duration} minutes
Total Marks: ${formData.maxMarks}

Instructions:
1. Read all questions carefully
2. Answer all questions
3. Write neatly and clearly

SECTION A - Multiple Choice Questions (20 Marks)
1. Question 1 here...
   a) Option A
   b) Option B
   c) Option C
   d) Option D

SECTION B - Short Answer Questions (30 Marks)
1. Question 1 here...

SECTION C - Long Answer Questions (50 Marks)
1. Question 1 here...

END OF PAPER`;
    
    setPaperContent(template);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {examPaper ? "Edit Exam Paper" : "Create New Exam Paper"}
        </h2>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="p-6">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
          <button
            onClick={() => setActiveTab("details")}
            className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 ${
              activeTab === "details"
                ? "text-brand-600 border-brand-600 bg-brand-50 dark:text-brand-400 dark:border-brand-400 dark:bg-brand-500/10"
                : "text-gray-600 border-transparent hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
          >
            📋 Paper Details
          </button>
          <button
            onClick={() => setActiveTab("create")}
            className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 ${
              activeTab === "create"
                ? "text-brand-600 border-brand-600 bg-brand-50 dark:text-brand-400 dark:border-brand-400 dark:bg-brand-500/10"
                : "text-gray-600 border-transparent hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
          >
            ✏️ Create/Upload Paper
          </button>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === "details" && (
            <div className="space-y-6">
              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="examName">Exam Name</Label>
                  <Input
                    type="text"
                    id="examName"
                    name="examName"
                    placeholder="Enter exam name"
                    defaultValue={formData.examName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="subjectName">Subject</Label>
                  <Select
                    options={[
                      { value: "Mathematics", label: "Mathematics" },
                      { value: "Physics", label: "Physics" },
                      { value: "Chemistry", label: "Chemistry" },
                      { value: "Biology", label: "Biology" },
                      { value: "English", label: "English" }
                    ]}
                    placeholder="Select Subject"
                    onChange={(value) => setFormData(prev => ({ ...prev, subjectName: value }))}
                    defaultValue={formData.subjectName}
                  />
                </div>
                <div>
                  <Label htmlFor="examType">Exam Type</Label>
                  <Select
                    options={[
                      { value: "Mid Term", label: "Mid Term" },
                      { value: "Final Term", label: "Final Term" },
                      { value: "Unit Test", label: "Unit Test" },
                      { value: "Mock Test", label: "Mock Test" }
                    ]}
                    placeholder="Select Exam Type"
                    onChange={(value) => setFormData(prev => ({ ...prev, examType: value }))}
                    defaultValue={formData.examType}
                  />
                </div>
                <div>
                  <Label htmlFor="batchName">Batch</Label>
                  <Select
                    options={[
                      { value: "Batch A", label: "Batch A" },
                      { value: "Batch B", label: "Batch B" },
                      { value: "Batch C", label: "Batch C" }
                    ]}
                    placeholder="Select Batch"
                    onChange={(value) => setFormData(prev => ({ ...prev, batchName: value }))}
                    defaultValue={formData.batchName}
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    type="number"
                    id="duration"
                    name="duration"
                    placeholder="e.g., 180"
                    defaultValue={formData.duration}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="maxMarks">Total Marks</Label>
                  <Input
                    type="number"
                    id="maxMarks"
                    name="maxMarks"
                    placeholder="e.g., 100"
                    defaultValue={formData.maxMarks}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Status Management */}
              <div>
                <Label className="mb-3">Paper Status</Label>
                <div className="flex flex-wrap gap-3">
                  {[
                    { value: "DRAFT", label: "Draft", color: "bg-gray-50 border-gray-300 text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300" },
                    { value: "SCHEDULED", label: "Scheduled", color: "bg-warning-50 border-warning-300 text-warning-700 dark:bg-warning-500/10 dark:border-warning-500 dark:text-warning-400" },
                    { value: "IN_PROGRESS", label: "In Progress", color: "bg-blue-light-50 border-blue-light-300 text-blue-light-700 dark:bg-blue-light-500/10 dark:border-blue-light-500 dark:text-blue-light-400" },
                    { value: "COMPLETED", label: "Completed", color: "bg-success-50 border-success-300 text-success-700 dark:bg-success-500/10 dark:border-success-500 dark:text-success-400" },
                  ].map((status) => (
                    <label
                      key={status.value}
                      className={`flex items-center px-4 py-3 rounded-lg border-2 cursor-pointer transition-all shadow-theme-xs ${
                        formData.status === status.value
                          ? `${status.color} ring-2 ring-brand-500/20`
                          : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400 dark:hover:border-gray-600"
                      }`}
                    >
                      <input
                        type="radio"
                        name="status"
                        value={status.value}
                        checked={formData.status === status.value}
                        onChange={() => handleStatusChange(status.value)}
                        className="sr-only"
                      />
                      <span className="text-sm font-medium">{status.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "create" && (
            <div className="space-y-6">
              {/* File Upload */}
              <div>
                <Label className="mb-3">Upload Paper File</Label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-brand-400 dark:hover:border-brand-500 transition-colors bg-gray-50 dark:bg-gray-800">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <svg className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="text-lg font-medium text-gray-600 dark:text-gray-300">
                      {uploadedFile ? uploadedFile.name : "Click to upload paper"}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      PDF, DOC, DOCX, TXT files allowed
                    </span>
                  </label>
                </div>
              </div>

              {/* Template Button */}
              <div className="text-center">
                <Button onClick={loadTemplate}>
                  Load Template
                </Button>
              </div>

              {/* Text Editor */}
              <div>
                <Label className="mb-3">Paper Content</Label>
                <textarea
                  value={paperContent}
                  onChange={(e) => setPaperContent(e.target.value)}
                  className="h-96 w-full appearance-none rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 bg-transparent text-gray-800 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 font-mono resize-none"
                  placeholder="Enter your exam paper content here or upload a file..."
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700 mt-8">
          <button
            onClick={onCancel}
            className="px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExamPaperForm;