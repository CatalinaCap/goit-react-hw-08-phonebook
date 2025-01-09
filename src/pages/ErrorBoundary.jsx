import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Actualizează starea pentru a arăta un mesaj de eroare
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Loghează eroarea în consolă pentru o investigație mai detaliată
    this.setState({ error, errorInfo });
    console.error('Eroare captată:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Poți returna orice mesaj de eroare personalizat sau o componentă de fallback
      return (
        <div>
          <h1>Ceva nu a mers bine!</h1>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    // Dacă nu există erori, renderizează componentele copil
    return this.props.children;
  }
}

export default ErrorBoundary;
