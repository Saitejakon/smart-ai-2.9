import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, FileText, X, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useStudyMate, UploadedFile } from "@/contexts/StudyMateContext";
import { extractSimulatedContent } from "@/utils/aiResponses";

export const PDFUpload = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const { toast } = useToast();
  const { files, addFile, updateFile, removeFile } = useStudyMate();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      processFiles(selectedFiles);
    }
  }, []);

  const processFiles = (fileList: File[]) => {
    const pdfFiles = fileList.filter(file => 
      file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')
    );
    
    if (pdfFiles.length !== fileList.length) {
      toast({
        title: "Invalid file type",
        description: "Only PDF files are supported",
        variant: "destructive",
      });
    }

    pdfFiles.forEach(file => {
      const newFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        status: 'uploading' as const
      };

      addFile(newFile);

      // Simulate upload and processing with realistic timing
      setTimeout(() => {
        updateFile(newFile.id, { status: 'processing' });
        
        setTimeout(() => {
          // Extract simulated content based on filename
          const content = extractSimulatedContent(file.name);
          updateFile(newFile.id, { 
            status: 'ready',
            content: content
          });
          
          toast({
            title: "PDF processed successfully",
            description: `${file.name} is ready for questions!`,
          });
        }, Math.random() * 2000 + 1500); // 1.5-3.5 seconds for processing
      }, Math.random() * 1000 + 500); // 0.5-1.5 seconds for upload
    });
  };


  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusColor = (status: UploadedFile['status']) => {
    switch (status) {
      case 'uploading': return 'text-yellow-600';
      case 'processing': return 'text-blue-600';
      case 'ready': return 'text-green-600';
      case 'error': return 'text-red-600';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusText = (status: UploadedFile['status']) => {
    switch (status) {
      case 'uploading': return 'Uploading...';
      case 'processing': return 'Processing...';
      case 'ready': return 'Ready';
      case 'error': return 'Error';
      default: return 'Unknown';
    }
  };

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Upload Your Study Materials</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Drop your PDF files here and let StudyMate's AI analyze them for instant Q&A
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Upload Area */}
          <Card 
            className={`relative p-8 border-2 border-dashed transition-all duration-300 ${
              isDragOver 
                ? 'border-primary bg-primary/5 shadow-medium' 
                : 'border-primary/30 bg-gradient-card hover:border-primary/50'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Drop your PDFs here</h3>
                <p className="text-muted-foreground mb-4">
                  or click to browse files
                </p>
                <input
                  type="file"
                  accept=".pdf"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button variant="upload" className="cursor-pointer">
                    Choose Files
                  </Button>
                </label>
              </div>
              <p className="text-sm text-muted-foreground">
                Supports: PDF files up to 10MB each
              </p>
            </div>
          </Card>

          {/* Uploaded Files */}
          {files.length > 0 && (
            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-semibold">Uploaded Files</h3>
              <div className="space-y-3">
                {files.map((file) => (
                  <Card key={file.id} className="p-4 bg-gradient-card shadow-soft">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          {file.status === 'ready' ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <FileText className="w-5 h-5 text-primary" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{file.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {formatFileSize(file.size)} • {" "}
                            <span className={getStatusColor(file.status)}>
                              {getStatusText(file.status)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFile(file.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    {file.status === 'uploading' || file.status === 'processing' ? (
                      <div className="mt-3">
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300 animate-pulse"
                            style={{ width: file.status === 'uploading' ? '30%' : '70%' }}
                          />
                        </div>
                      </div>
                    ) : null}
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};