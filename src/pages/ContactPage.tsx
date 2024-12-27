import React, { useState, useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const navigate = useNavigate();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [state, handleSubmit] = useForm("meooeove");

  useEffect(() => {
    if (state.succeeded) {
      toast.success("Form submitted successfully!");
    }
  }, [state.succeeded]);

  if (state.submitting) {
    return (
      <>
        <p>Submitting...</p>
      </>
    );
  }
  if (state.succeeded) {
    return (
      <>
        <p>Thanks for contacting us!</p>
        <button className="" onClick={() => navigate("/")}>
          Go back to home
        </button>
      </>
    );
  }

  if (state.errors) {
    return (
      <>
        <p>Something went wrong, please try again!</p>
      </>
    );
  }

  return (
    <div className="p-6 bg-light-background dark:bg-black min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      <p className="mb-6 text-center max-w-2xl">
        If you have any questions, comments, or concerns, please feel free to
        reach out to us using the form below.
      </p>
      <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border dark:bg-black border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border dark:bg-black border-gray-300 rounded-md"
            required
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border dark:bg-black border-gray-300 rounded-md"
            rows={4}
            required
          />
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
          />
        </div>
        <button
          type="submit"
          disabled={state.submitting}
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
