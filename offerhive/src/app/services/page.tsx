"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Atom,
  Brain,
  Code2,
  Server,
  Database,
  LayoutDashboard,
} from "lucide-react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import emailjs from "emailjs-com";

const services = [
  {
    title: "Next.js & React",
    icon: <LayoutDashboard className="w-8 h-8 text-blue-500" />,
    description:
      "Blazing fast, SEO-optimized modern websites using Next.js and React.",
  },
  {
    title: "NestJS & Express",
    icon: <Server className="w-8 h-8 text-red-500" />,
    description:
      "Scalable APIs with NestJS and Express.js for any backend workload.",
  },
  {
    title: "MongoDB & PostgreSQL",
    icon: <Database className="w-8 h-8 text-green-500" />,
    description:
      "Flexible or relational — fast, safe, and performant data handling.",
  },
  {
    title: "Three.js & WebGL",
    icon: <Brain className="w-8 h-8 text-purple-500" />,
    description:
      "Interactive 3D experiences and immersive web graphics using Three.js.",
  },
  {
    title: "AI & LLMs",
    icon: <Brain className="w-8 h-8 text-yellow-500" />,
    description:
      "Integrate smart AI experiences with ChatGPT, LangChain, and custom models.",
  },
  {
    title: "Full-stack Solutions",
    icon: <Code2 className="w-8 h-8 text-gray-600" />,
    description: "Complete full-stack applications tailored to your vision.",
  },
  {
    title: "Automation & Freelance Tools",
    icon: <Atom className="w-8 h-8 text-indigo-500" />,
    description:
      "n8n, Stripe, Webhooks — automate your workflow and scale faster.",
  },
];

export default function ServicesPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  // Three.js particles background
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const controls = new OrbitControls(camera, canvasRef.current);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x8888ff,
      size: 0.02,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.y += 0.001;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAIL_SERVICE_KEY as string,
        process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_KEY as string,
        {
          from_name: formData.name,
          from_email: formData.email,
          email: formData?.email,
          title: selectedService,
          message: `${formData.message}\n\nRequested Service: ${selectedService}`,
          to_email: "adeeltahir6a@gmail.com",
        },
        process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          setStatus("Sent successfully!");

          setFormData({ name: "", email: "", message: "" });
          alert("Request sent successfully!");

          setTimeout(() => {
            setSelectedService(null);
            setStatus("");
          }, 2000);
        },
        () => {
          setStatus("Something went wrong.");
          alert("Error Sending Request!");
        }
      );
  };

  return (
    <section className="relative min-h-screen p-4 flex flex-col items-center justify-center bg-gray-900 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0"
      />

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2 text-white">Our Services</h1>
          <p className="text-gray-300 max-w-xl mx-auto">
            We deliver cutting-edge web solutions using the latest tech stacks.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-4">
                {service.icon}
                <h2 className="text-xl font-semibold text-white">
                  {service.title}
                </h2>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                {service.description}
              </p>
              <button
                className="mt-auto px-4 py-2 text-sm rounded-lg bg-yellow-500 cursor-pointer text-black hover:bg-yellow-400"
                onClick={() => setSelectedService(service.title)}
              >
                Request This Service
              </button>
            </motion.div>
          ))}
        </div>

      {/* Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md text-black space-y-4 relative">
            <button
              className="absolute top-2 right-3 text-gray-500"
              onClick={() => setSelectedService(null)}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold">Request: {selectedService}</h2>
            <form onSubmit={sendRequest} className="space-y-4">
              <input
                required
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 border rounded-lg"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <input
                required
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 border rounded-lg"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <textarea
                required
                placeholder="Message"
                className="w-full px-4 py-2 border rounded-lg"
                rows={4}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
              <button
                type="submit"
                className="w-full bg-yellow-500 py-2 rounded-lg font-semibold hover:bg-yellow-400"
              >
                {loading ? "sending..." : "Send Request"}
              </button>
            </form>
            {status && <p className="text-sm text-green-600 mt-2">{status}</p>}
          </div>
        </div>
      )}
    </section>
  );
}
