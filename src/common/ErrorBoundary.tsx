import { Component, ErrorInfo, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface ErrorBoundaryProps {
  children: ReactNode;
  navigate: (path: string) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render shows the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to an external error reporting service.
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleRetry = () => {
    // Navigate to the home page and reset the error state.
    this.setState({ hasError: false, error: null });
    this.props.navigate("/");
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            backgroundColor: "#f8f9fa",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "4rem", color: "#dc3545" }}>404</h1>
          <p style={{ fontSize: "1.5rem", color: "#6c757d" }}>
            Something went wrong. Please try again later.
          </p>
          {this.state.error && (
            <details style={{ whiteSpace: "pre-wrap", color: "#495057" }}>
              {this.state.error.message}
            </details>
          )}
          <button
            onClick={this.handleRetry}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              fontSize: "1rem",
              color: "#fff",
              backgroundColor: "#007bff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Wrapper to inject `navigate` into the ErrorBoundary
const ErrorBoundaryWithNavigate = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  return <ErrorBoundary navigate={navigate}>{children}</ErrorBoundary>;
};

export default ErrorBoundaryWithNavigate;
