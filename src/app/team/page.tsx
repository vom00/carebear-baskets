import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = { title: "Meet the team" };

// [name, role, photo width, photo height]
const team = [
  ["Jyotsna", "President", 486, 499],
  ["Gauri", "Vice President", 440, 478],
  ["Jasmine", "Logistics Director", 476, 459],
  ["Masooma", "Marketing Lead", 474, 496],
  ["Vivia", "Events Director", 494, 516],
  ["Arjun", "Treasurer", 460, 503],
  ["Vyom", "Tech Lead", 607, 507],
] as const;

export default function Team() {
  return (
    <>
      <section className="page-head" aria-labelledby="team-title" data-theme="dark">
        <div className="stars" aria-hidden="true" />
        <div className="wrap">
          <h1 id="team-title">Meet the team</h1>
          <p>
            A group of Coppell High School students turning care into action, one basket at a
            time.
          </p>
        </div>
      </section>

      <section className="section" aria-label="Team members">
        <ul className="wrap team-grid">
          {team.map(([name, role, w, h]) => (
            <li className="member" key={name}>
              <Image
                src={`/uploads/team_${name.toLowerCase()}.png`}
                width={w}
                height={h}
                alt={`${name}, ${role}`}
                sizes="(max-width: 520px) 50vw, 200px"
              />
              <p className="name">{name}</p>
              <p className="role">{role}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
