import { Component } from "solid-js";

export const LoadingSpinner: Component = () => {
  return (
    <div class="loading-spinner">
      <div class="spinner"></div>
      <p>Loading...</p>
    </div>
  );
}; 
