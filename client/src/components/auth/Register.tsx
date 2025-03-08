import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register: React.FC = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required('Prénom requis'),
    lastName: Yup.string()
      .required('Nom requis'),
    email: Yup.string()
      .email('Email invalide')
      .required('Email requis'),
    password: Yup.string()
      .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
      .required('Mot de passe requis'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Les mots de passe ne correspondent pas')
      .required('Confirmation du mot de passe requise'),
  });

  const handleSubmit = async (values: any) => {
    try {
      // Simulation d'inscription pour les tests
      toast.success('Inscription réussie ! Vous pouvez maintenant vous connecter.');
      navigate('/login');
    } catch (error) {
      toast.error('Une erreur est survenue lors de l\'inscription');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div>
          <h1 className="text-center text-3xl font-extrabold text-gray-900">
            Créez votre compte FinCach
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Rejoignez notre plateforme de modélisation financière
          </p>
        </div>

        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange }) => (
            <Form className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                      Prénom
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={values.firstName}
                      onChange={handleChange}
                      className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {touched.firstName && errors.firstName && (
                      <p className="mt-2 text-sm text-red-600">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                      Nom
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={values.lastName}
                      onChange={handleChange}
                      className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {touched.lastName && errors.lastName && (
                      <p className="mt-2 text-sm text-red-600">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {touched.email && errors.email && (
                    <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Mot de passe
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {touched.password && errors.password && (
                    <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                    Confirmer le mot de passe
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  S'inscrire
                </button>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Déjà inscrit ?{' '}
                  <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                    Connectez-vous
                  </Link>
                