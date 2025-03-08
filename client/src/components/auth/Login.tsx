import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login: React.FC = () => {
  const [isResetMode, setIsResetMode] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Email invalide')
      .required('Email requis'),
    password: !isResetMode ? Yup.string()
      .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
      .required('Mot de passe requis') : Yup.string(),
  });

  const handleSubmit = async (values: any) => {
    try {
      if (isResetMode) {
        // Appel API pour réinitialiser le mot de passe
        toast.success('Instructions envoyées par email');
        setIsResetMode(false);
      } else {
        // Simulation de connexion pour les tests
        if (values.email === 'admin@fincach.com' && values.password === 'Admin123!') {
          localStorage.setItem('userRole', 'admin');
          navigate('/dashboard');
        } else if (values.email === 'user@fincach.com' && values.password === 'User123!') {
          localStorage.setItem('userRole', 'user');
          navigate('/dashboard');
        } else {
          toast.error('Identifiants invalides');
        }
      }
    } catch (error) {
      toast.error('Une erreur est survenue');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div>
          <h1 className="text-center text-3xl font-extrabold text-gray-900">
            {isResetMode ? 'Réinitialisation du mot de passe' : 'Bienvenue sur FinCach'}
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            {!isResetMode && "Votre plateforme de modélisation financière intelligente"}
          </p>
        </div>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange }) => (
            <Form className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm space-y-4">
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

                {!isResetMode && (
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
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <button
                    type="button"
                    onClick={() => setIsResetMode(!isResetMode)}
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    {isResetMode ? 'Retour à la connexion' : 'Mot de passe oublié ?'}
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {isResetMode ? 'Envoyer les instructions' : 'Se connecter'}
                </button>
              </div>

              {!isResetMode && (
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Pas encore de compte ?{' '}
                    <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                      Inscrivez-vous gratuitement
                    </Link>
                  </p>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;