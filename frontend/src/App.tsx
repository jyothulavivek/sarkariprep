import DailyNews from './components/DailyNews';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Menu, X, BookOpen, Calendar, FileText, Users, ChevronRight, Star, Clock, TrendingUp, Award, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

// Navigation Component
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Exams', href: '#exams' },
    { name: 'Current Affairs', href: '#current-affairs' },
    { name: 'Study Materials', href: '#study-materials' },
    { name: 'Mock Tests', href: '#mock-tests' },
    { name: 'Success Stories', href: '#success-stories' },
    { name: 'Video Lectures', href: '#videos' }
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-blue-950/80 backdrop-blur-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className={`text-xl font-bold ${scrolled ? 'text-gray-900' : 'text-white'}`}>SarkariPrep</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`text-sm font-medium transition-colors hover:text-blue-400 ${scrolled ? 'text-gray-700' : 'text-white'}`}
              >
                {link.name}
              </a>
            ))}
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Get Started</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className={`w-6 h-6 ${scrolled ? 'text-gray-900' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${scrolled ? 'text-gray-900' : 'text-white'}`} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white rounded-lg shadow-xl mt-2 p-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="block py-3 px-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}
            <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white">Get Started</Button>
          </div>
        )}
      </div>
    </nav>
  );
};

// Hero Section
const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1920&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-blue-900/40"></div>
      </div>

      {/* Animated Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <Badge className="mb-6 px-4 py-2 bg-white/10 text-white border-white/20 backdrop-blur-sm">
          <Star className="w-4 h-4 mr-2 text-yellow-400" />
          Trusted by 50,000+ Students
        </Badge>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Your Gateway to<br />
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Government Jobs
          </span>
        </h1>

        <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
          Comprehensive preparation platform for all government exams. Daily current affairs, 
          mock tests, study materials, and expert guidance to help you succeed.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
            Start Learning Now
            <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
          <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg">
            <Calendar className="mr-2 w-5 h-5" />
            View Exam Calendar
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '50K+', label: 'Active Students' },
            { value: '100+', label: 'Exam Categories' },
            { value: '10K+', label: 'Mock Tests' },
            { value: '95%', label: 'Success Rate' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-white/60 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Exam Categories Section
const ExamCategoriesSection = () => {
  const [selectedExam, setSelectedExam] = useState<any>(null);

  const examCategories = [
    {
      id: 'upsc',
      name: 'UPSC',
      fullName: 'Union Public Service Commission',
      icon: '🏛️',
      color: 'from-orange-500 to-red-600',
      exams: [
        { name: 'Civil Services (IAS)', posts: '1,011', lastDate: '2025-02-21', eligibility: 'Graduate', url: 'https://upsconline.nic.in' },
        { name: 'IFS (Forest Service)', posts: '150', lastDate: '2025-02-21', eligibility: 'Graduate', url: 'https://upsconline.nic.in' },
        { name: 'IES/ISS', posts: '78', lastDate: '2025-03-15', eligibility: 'Post Graduate', url: 'https://upsconline.nic.in' },
        { name: 'CDS', posts: '459', lastDate: '2025-01-28', eligibility: '12th/Graduate', url: 'https://upsconline.nic.in' },
        { name: 'NDA', posts: '406', lastDate: '2025-01-14', eligibility: '12th', url: 'https://upsconline.nic.in' },
        { name: 'CAPF', posts: '357', lastDate: '2025-05-07', eligibility: 'Graduate', url: 'https://upsconline.nic.in' },
      ],
    },
    {
      id: 'ssc',
      name: 'SSC',
      fullName: 'Staff Selection Commission',
      icon: '📋',
      color: 'from-blue-500 to-cyan-600',
      exams: [
        { name: 'CGL', posts: '37,409', lastDate: '2025-01-31', eligibility: 'Graduate', url: 'https://ssc.gov.in' },
        { name: 'CHSL', posts: '3,712', lastDate: '2025-02-11', eligibility: '12th', url: 'https://ssc.gov.in' },
        { name: 'CPO', posts: '4,000+', lastDate: '2025-03-31', eligibility: 'Graduate', url: 'https://ssc.gov.in' },
        { name: 'GD Constable', posts: '39,481', lastDate: '2025-02-10', eligibility: '10th', url: 'https://ssc.gov.in' },
        { name: 'MTS', posts: '9,583', lastDate: '2025-02-10', eligibility: '10th/12th', url: 'https://ssc.gov.in' },
        { name: 'Stenographer', posts: '1,506', lastDate: '2025-03-31', eligibility: '12th', url: 'https://ssc.gov.in' },
      ],
    },
    {
      id: 'banking',
      name: 'Banking',
      fullName: 'Banking & Insurance',
      icon: '🏦',
      color: 'from-green-500 to-emerald-600',
      exams: [
        { name: 'SBI PO', posts: '600', lastDate: '2025-02-21', eligibility: 'Graduate', url: 'https://sbi.co.in/web/careers' },
        { name: 'SBI Clerk', posts: '14,191', lastDate: '2025-01-27', eligibility: 'Graduate', url: 'https://sbi.co.in/web/careers' },
        { name: 'IBPS PO', posts: '4,550', lastDate: '2025-08-01', eligibility: 'Graduate', url: 'https://ibps.in' },
        { name: 'IBPS Clerk', posts: '6,125', lastDate: '2025-07-21', eligibility: 'Graduate', url: 'https://ibps.in' },
        { name: 'RBI Grade B', posts: '291', lastDate: '2025-03-24', eligibility: 'Graduate', url: 'https://opportunities.rbi.org.in' },
        { name: 'LIC AAO', posts: '150', lastDate: '2025-03-01', eligibility: 'Graduate', url: 'https://licindia.in' },
      ],
    },
    {
      id: 'railway',
      name: 'Railway',
      fullName: 'Indian Railways',
      icon: '🚂',
      color: 'from-purple-500 to-violet-600',
      exams: [
        { name: 'RRB NTPC', posts: '11,558', lastDate: '2025-02-22', eligibility: '12th/Graduate', url: 'https://rrbcdg.gov.in' },
        { name: 'RRB Group D', posts: '32,000+', lastDate: '2025-03-22', eligibility: '10th', url: 'https://rrbcdg.gov.in' },
        { name: 'RRB ALP', posts: '5,000+', lastDate: '2025-05-15', eligibility: 'ITI/Diploma', url: 'https://rrbcdg.gov.in' },
        { name: 'RRB JE', posts: '13,487', lastDate: '2025-04-30', eligibility: 'Diploma/Degree', url: 'https://rrbcdg.gov.in' },
        { name: 'RPF SI', posts: '4,520', lastDate: '2025-05-01', eligibility: 'Graduate', url: 'https://rpf.indianrailways.gov.in' },
        { name: 'RPF Constable', posts: '4,208', lastDate: '2025-05-01', eligibility: '10th', url: 'https://rpf.indianrailways.gov.in' },
      ],
    },
    {
      id: 'teaching',
      name: 'Teaching',
      fullName: 'Teaching Exams',
      icon: '👨‍🏫',
      color: 'from-pink-500 to-rose-600',
      exams: [
        { name: 'CTET', posts: 'N/A', lastDate: '2025-03-15', eligibility: 'D.Ed/B.Ed', url: 'https://ctet.nic.in' },
        { name: 'UPTET', posts: 'N/A', lastDate: '2025-04-01', eligibility: 'D.Ed/B.Ed', url: 'https://updeled.gov.in' },
        { name: 'SUPER TET', posts: 'N/A', lastDate: '2025-05-01', eligibility: 'TET Qualified', url: 'https://updeled.gov.in' },
        { name: 'KVS PGT/TGT', posts: '7,900+', lastDate: '2025-03-31', eligibility: 'B.Ed', url: 'https://kvsangathan.nic.in' },
        { name: 'NVS PGT/TGT', posts: '1,800+', lastDate: '2025-04-15', eligibility: 'B.Ed', url: 'https://navodaya.gov.in' },
        { name: 'DSSSB', posts: '5,000+', lastDate: '2025-03-31', eligibility: 'Graduate/B.Ed', url: 'https://dsssb.delhi.gov.in' },
      ],
    },
    {
      id: 'state',
      name: 'State PSC',
      fullName: 'State Public Service Commission',
      icon: '🏛️',
      color: 'from-amber-500 to-yellow-600',
      exams: [
        { name: 'UPPSC PCS', posts: '220', lastDate: '2025-02-28', eligibility: 'Graduate', url: 'https://uppsc.up.nic.in' },
        { name: 'BPSC', posts: '1,500+', lastDate: '2025-03-31', eligibility: 'Graduate', url: 'https://bpsc.bih.nic.in' },
        { name: 'MPPSC', posts: '456', lastDate: '2025-04-15', eligibility: 'Graduate', url: 'https://mppsc.mp.gov.in' },
        { name: 'RPSC', posts: '800+', lastDate: '2025-03-15', eligibility: 'Graduate', url: 'https://rpsc.rajasthan.gov.in' },
        { name: 'MPSC', posts: '900+', lastDate: '2025-04-30', eligibility: 'Graduate', url: 'https://mpsc.gov.in' },
        { name: 'TNPSC', posts: '2,500+', lastDate: '2025-03-31', eligibility: 'Graduate', url: 'https://tnpsc.gov.in' },
      ],
    },
  ];

  return (
    <section id="exams" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-700">Exam Categories</Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Career Path</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore all major government exam categories and find the perfect opportunity for your career
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {examCategories.map((category) => (
            <Card
              key={category.id}
              className="group cursor-pointer hover:shadow-2xl transition-all duration-300 border-0 shadow-lg overflow-hidden"
              onClick={() => setSelectedExam(category)}
            >
              <div className={`h-2 bg-gradient-to-r ${category.color}`}></div>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="text-4xl">{category.icon}</div>
                  <Badge variant="secondary" className="bg-gray-100">
                    {category.exams.length} Exams
                  </Badge>
                </div>
                <CardTitle className="text-2xl mt-4">{category.name}</CardTitle>
                <CardDescription>{category.fullName}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {category.exams.slice(0, 4).map((exam, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">{exam.name}</span>
                      <span className="text-blue-600 font-medium">{exam.posts} Posts</span>
                    </div>
                  ))}
                </div>
                <Button className={`w-full mt-6 bg-gradient-to-r ${category.color} text-white`}>
                  View All Exams
                  <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Exam Detail Dialog */}
        <Dialog open={!!selectedExam} onOpenChange={() => setSelectedExam(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle className="text-2xl flex items-center gap-3">
                <span className="text-3xl">{selectedExam?.icon}</span>
                {selectedExam?.name} Exams
              </DialogTitle>
              <DialogDescription>{selectedExam?.fullName}</DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-[60vh]">
              <div className="space-y-4 p-4">
                {selectedExam?.exams.map((exam: any, idx: number) => (
                  <Card key={idx} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{exam.name}</h3>
                          <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {exam.posts} Vacancies
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              Last Date: {exam.lastDate}
                            </span>
                            <span className="flex items-center gap-1">
                              <Award className="w-4 h-4" />
                              {exam.eligibility}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Syllabus</Button>
                          <Button 
                            size="sm" 
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={() => window.open(exam.url, '_blank', 'noopener,noreferrer')}
                          >
                            Apply Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

// Daily Current Affairs Section
const CurrentAffairsSection = () => {
  const [selectedNews, setSelectedNews] = useState<any>(null);

  const currentAffairs = {
    '2025-02-07': [
      {
        category: 'National',
        title: 'Union Budget 2025-26: Key Highlights for Students',
        summary: 'Education sector allocation increased by 15%. New AI research centers to be established in 50 universities.',
        important: true,
        fullContent: `The Union Budget 2025-26, presented by Finance Minister Nirmala Sitharaman, brings significant announcements for the education sector and students preparing for government exams.

**Key Highlights:**

1. **Education Sector Allocation**: The education budget has been increased by 15% to ₹1.28 lakh crore, the highest ever allocation for the sector.

2. **AI Research Centers**: 50 new AI research centers will be established in universities across India to promote research and innovation in artificial intelligence.

3. **Digital Infrastructure**: ₹10,000 crore allocated for upgrading digital infrastructure in government schools and colleges.

4. **Scholarship Schemes**: The Post-Matric Scholarship Scheme for SC students has been enhanced with an additional ₹1,500 crore allocation.

5. **Skill Development**: 5 new National Skill Training Institutes will be set up to provide vocational training to 10 lakh youth annually.

6. **Higher Education**: The budget for Higher Education Financing Agency (HEFA) has been doubled to ₹20,000 crore.

**Impact on Government Exam Aspirants:**
- More teaching positions will be created
- Digital learning resources will improve
- Scholarship opportunities will increase
- Skill-based questions may appear in exams

**Source**: Ministry of Finance, Government of India`,
        date: 'February 7, 2025',
        source: 'PIB',
      },
      {
        category: 'International',
        title: 'India-US Trade Relations: New Agreement Signed',
        summary: 'Bilateral trade target set at $500 billion by 2030. Technology transfer agreements in defense sector.',
        important: true,
        fullContent: `India and the United States have signed a comprehensive trade agreement aimed at strengthening bilateral economic ties and enhancing cooperation in key sectors.

**Key Provisions:**

1. **Trade Target**: Bilateral trade between India and US is targeted to reach $500 billion by 2030, up from the current $190 billion.

2. **Defense Cooperation**: Technology transfer agreements signed for co-production of defense equipment including jet engines and drones.

3. **Tariff Reduction**: India will reduce tariffs on 40 US products including apples, almonds, and walnuts.

4. **Services Trade**: Enhanced cooperation in IT services, healthcare, and education sectors.

5. **Investment Protection**: Bilateral Investment Treaty (BIT) to be finalized within 6 months.

6. **Semiconductor Partnership**: Joint initiative to develop semiconductor manufacturing ecosystem in India.

**Strategic Importance:**
- Counter to China's economic influence
- Job creation in both countries
- Technology access for India
- Market access for US companies

**For Exam Preparation:**
- Important for International Relations section
- May appear in UPSC, Banking exams
- Relevant for Group Discussion topics

**Source**: Ministry of External Affairs`,
        date: 'February 7, 2025',
        source: 'MEA',
      },
      {
        category: 'Economy',
        title: 'RBI Monetary Policy: Repo Rate Unchanged at 6.5%',
        summary: 'Reserve Bank of India maintains status quo on interest rates. Inflation projected at 4.5% for FY26.',
        important: false,
        fullContent: `The Reserve Bank of India's Monetary Policy Committee (MPC) has decided to keep the repo rate unchanged at 6.5% in its first bi-monthly policy review of 2025.

**Key Decisions:**

1. **Repo Rate**: Unchanged at 6.5%
2. **Reverse Repo Rate**: Unchanged at 3.35%
3. **Bank Rate**: Unchanged at 6.75%
4. **MSF Rate**: Unchanged at 6.75%

**RBI's Assessment:**

- **GDP Growth**: Projected at 7.2% for FY 2025-26
- **Inflation**: CPI inflation projected at 4.5% for FY26
- **Food Inflation**: Expected to moderate in coming months
- **Core Inflation**: Remains sticky at around 4%

**Policy Stance**: "Withdrawal of Accommodation" - indicating RBI may cut rates later if inflation cools.

**Impact on Economy:**
- Home loan EMIs remain unchanged
- FD rates to stay stable
- Stock markets reacted positively
- Rupee strengthened against dollar

**Banking Sector:**
- Credit growth remains robust at 16%
- Deposit growth at 12%
- NPA levels at decadal low

**For Exam Preparation:**
- Important for Banking exams (IBPS, SBI)
- Key terms: Repo Rate, Reverse Repo Rate, CRR, SLR
- Understanding monetary policy transmission

**Source**: Reserve Bank of India`,
        date: 'February 7, 2025',
        source: 'RBI',
      },
      {
        category: 'Sports',
        title: 'India Wins ICC Champions Trophy 2025',
        summary: 'Team India defeats Australia by 6 wickets in final. Virat Kohli named Player of the Tournament.',
        important: false,
        fullContent: `Team India has won the ICC Champions Trophy 2025, defeating Australia by 6 wickets in a thrilling final at Dubai International Stadium.

**Match Summary:**

- **Australia**: 264 all out (50 overs)
  - Travis Head: 87 runs
  - Steve Smith: 62 runs
  - Jasprit Bumrah: 4/42

- **India**: 268/4 (48.2 overs)
  - Virat Kohli: 102* (not out)
  - Shreyas Iyer: 68 runs
  - KL Rahul: 45* (not out)

**Key Moments:**
- Australia won the toss and chose to bat
- Bumrah's early breakthroughs restricted Australia
- Kohli's 51st ODI century anchored the chase
- India chased down the target with 10 balls to spare

**Awards:**
- **Player of the Match**: Virat Kohli
- **Player of the Tournament**: Virat Kohli (542 runs)
- **Best Bowler**: Jasprit Bumrah (18 wickets)
- **Emerging Player**: Shubman Gill

**Tournament Journey:**
- India won all 5 matches
- Defeated Pakistan in group stage
- Beat England in semi-final
- Champions for the 3rd time (2002, 2013, 2025)

**Records Broken:**
- Kohli became highest run-scorer in ICC tournament history
- India became most successful team in Champions Trophy

**For Exam Preparation:**
- Important for Sports GK section
- Awards and honors questions
- Cricket records and statistics

**Source**: ICC, BCCI`,
        date: 'February 7, 2025',
        source: 'BCCI',
      },
      {
        category: 'Science',
        title: 'ISRO Successfully Tests Reusable Launch Vehicle',
        summary: 'RLV Landing Experiment-03 completed successfully. Major step towards low-cost space missions.',
        important: true,
        fullContent: `The Indian Space Research Organisation (ISRO) has successfully conducted the Reusable Launch Vehicle (RLV) Landing Experiment-03 (LEX-03) at the Aeronautical Test Range in Challakere, Karnataka.

**Mission Details:**

1. **Objective**: Demonstrate autonomous landing capability of a winged body vehicle
2. **Vehicle**: RLV-TD (Technology Demonstrator)
3. **Launch**: Air-dropped from a Chinook helicopter at 4.5 km altitude
4. **Landing**: Precise touchdown on the runway at 350 km/h
5. **Duration**: 8 minutes from release to landing

**Key Achievements:**

- **Autonomous Navigation**: Vehicle navigated itself to the landing site using onboard systems
- **Cross-range Capability**: Demonstrated 5 km cross-range maneuver
- **Landing Precision**: Landed within 5 meters of target point
- **Reusability**: Vehicle can be refurbished and reused up to 10 times

**Technology Demonstrated:**
- Advanced guidance and navigation systems
- Thermal protection system for re-entry
- Landing gear designed for high-speed touchdown
- Real-time telemetry and control

**Future Roadmap:**

1. **RLV-ORV**: Orbital Return Vehicle - planned for 2026
2. **RLV-OMV**: Orbital Maneuvering Vehicle - planned for 2028
3. **Full RLV**: Complete reusable launch system - planned for 2030

**Cost Savings:**
- Current launch cost: $10,000/kg
- RLV target cost: $2,000/kg
- 80% reduction in launch costs expected

**Comparison:**
- Similar to NASA's Space Shuttle
- More advanced than China's reusable rocket program
- Cost-effective alternative to SpaceX Falcon 9

**For Exam Preparation:**
- Important for Science & Technology section
- ISRO missions and achievements
- Space technology terminology

**Source**: ISRO`,
        date: 'February 7, 2025',
        source: 'ISRO',
      },
    ],
    '2025-02-06': [
      {
        category: 'National',
        title: 'PM Modi Inaugurates New Parliament Building Annex',
        summary: 'State-of-the-art facility with digital infrastructure. Capacity increased to 1,272 seats.',
        important: false,
        fullContent: `Prime Minister Narendra Modi has inaugurated the new Parliament Building Annex, a state-of-the-art facility designed to enhance the functioning of India's legislative bodies.

**Key Features:**

1. **Seating Capacity**: 1,272 seats (Lok Sabha: 888, Rajya Sabha: 384)
2. **Digital Infrastructure**: Paperless operations with tablets for every MP
3. **Accessibility**: Fully accessible for differently-abled persons
4. **Green Building**: LEED Platinum certified with 30% energy savings
5. **Security**: Multi-layered security with AI-powered surveillance

**Facilities:**

- **Constitutional Hall**: For joint sessions of Parliament
- **Committee Rooms**: 50 rooms with video conferencing
- **Media Center**: Capacity for 1,000 journalists
- **Library**: Digital library with 5 million documents
- **Museum**: Parliamentary history and artifacts

**Technology Integration:**
- E-Voting system for MPs
- Real-time translation in 22 languages
- AI-based speech-to-text transcription
- Digital document management system

**Architecture:**
- Designed by HCP Design, Planning and Management
- Triangular shape representing India's diversity
- National symbols integrated in design
- Made with sandstone from Rajasthan

**Cost and Timeline:**
- Total cost: ₹970 crore
- Construction period: 3 years
- Built by Tata Projects Limited

**Significance:**
- Replaces 100-year-old Parliament building
- Reflects aspirations of new India
- Symbol of democratic values
- Showcases Indian architectural excellence

**For Exam Preparation:**
- Polity: Parliamentary system
- Architecture and culture
- Government schemes and projects

**Source**: Lok Sabha Secretariat`,
        date: 'February 6, 2025',
        source: 'PIB',
      },
      {
        category: 'Defense',
        title: 'India Successfully Test-Fires Agni-V Missile',
        summary: 'Ballistic missile with 5,000 km range tested. MIRV capability demonstrated successfully.',
        important: true,
        fullContent: `India has successfully test-fired the Agni-V ballistic missile with Multiple Independently Targetable Re-entry Vehicle (MIRV) technology from APJ Abdul Kalam Island off the coast of Odisha.

**Missile Specifications:**

1. **Range**: 5,000-5,500 km (can reach most parts of China and Europe)
2. **Type**: Intercontinental Ballistic Missile (ICBM)
3. **Warhead**: MIRV - can carry 3-10 nuclear warheads
4. **Guidance**: Ring Laser Gyro-based Inertial Navigation System
5. **Propulsion**: Three-stage solid fuel engine
6. **Weight**: 50 tonnes
7. **Length**: 17 meters

**MIRV Technology:**

- Multiple warheads on single missile
- Each warhead can hit different targets
- Makes missile defense difficult
- Only 6 countries have this technology (USA, Russia, China, UK, France, India)

**Test Details:**

- **Date**: February 6, 2025
- **Location**: APJ Abdul Kalam Island, Odisha
- **Flight Duration**: 19 minutes
- **Impact Accuracy**: Within 10 meters of target
- **All Parameters**: Met successfully

**Strategic Significance:**

1. **Deterrence**: Strengthens India's nuclear deterrence
2. **Second Strike Capability**: Ensures retaliation capability
3. **Regional Balance**: Counters missile threats from neighbors
4. **Indigenous Technology**: 95% components made in India

**Development Timeline:**

- 2012: First test of Agni-V
- 2015: Canister launch tested
- 2018: User trials completed
- 2022: MIRV development started
- 2024: First MIRV test
- 2025: Successful MIRV demonstration

**Comparison with Other Missiles:**

| Missile | Country | Range | MIRV |
|---------|---------|-------|------|
| Agni-V | India | 5,500 km | Yes |
| Dongfeng-41 | China | 12,000 km | Yes |
| RS-28 Sarmat | Russia | 18,000 km | Yes |
| Minuteman III | USA | 13,000 km | Yes |

**For Exam Preparation:**
- Defense and security
- Missile technology
- India's strategic programs

**Source**: DRDO, Ministry of Defence`,
        date: 'February 6, 2025',
        source: 'DRDO',
      },
      {
        category: 'Environment',
        title: 'India Commits to Net Zero by 2070',
        summary: 'Renewable energy capacity to reach 500 GW by 2030. Green hydrogen mission launched.',
        important: false,
        fullContent: `India has reaffirmed its commitment to achieve Net Zero carbon emissions by 2070, with ambitious targets for renewable energy expansion and green hydrogen production.

**Key Commitments:**

1. **Net Zero Target**: 2070 (50 years from now)
2. **Renewable Energy**: 500 GW capacity by 2030
3. **Green Hydrogen**: 5 million tonnes annual production by 2030
4. **Emission Intensity**: Reduce GDP emission intensity by 45% by 2030
5. **Non-Fossil Fuel**: 50% of installed capacity from non-fossil sources by 2030

**Green Hydrogen Mission:**

- **Budget**: ₹19,744 crore allocated
- **Production Target**: 5 MT by 2030
- **Applications**: Fertilizers, steel, transport, energy
- **Export Potential**: $10 billion by 2030
- **Job Creation**: 6 lakh direct and indirect jobs

**Current Progress:**

| Source | Current Capacity | Target 2030 |
|--------|-----------------|-------------|
| Solar | 85 GW | 280 GW |
| Wind | 45 GW | 140 GW |
| Hydro | 52 GW | 70 GW |
| Nuclear | 7 GW | 20 GW |
| Green Hydrogen | 0 | 5 MT |

**Policy Initiatives:**

1. **PLI Scheme**: ₹24,000 crore for solar module manufacturing
2. **National Green Hydrogen Policy**: Tax exemptions, land allocation
3. **Carbon Credit Trading**: Market mechanism for emission reduction
4. **EV Adoption**: 30% of vehicles to be electric by 2030

**International Cooperation:**

- International Solar Alliance (ISA) - 120 member countries
- One Sun One World One Grid initiative
- Partnership with EU for green technology
- Quad Clean Energy Partnership

**Challenges:**

- High initial costs of green technology
- Storage and grid integration issues
- Land acquisition for solar/wind farms
- Skilled workforce shortage

**For Exam Preparation:**
- Environment and ecology
- Government schemes
- International climate agreements
- Renewable energy technologies

**Source**: Ministry of Environment, MNRE`,
        date: 'February 6, 2025',
        source: 'MNRE',
      },
    ],
    '2025-02-05': [
      {
        category: 'National',
        title: 'Ayushman Bharat Coverage Expanded',
        summary: 'Health insurance coverage increased to ₹10 lakh per family. 50 crore beneficiaries enrolled.',
        important: true,
        fullContent: `The Government of India has expanded the Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (AB-PMJAY), increasing the health insurance coverage and adding more beneficiaries to the world's largest government-funded healthcare scheme.

**Key Updates:**

1. **Coverage Amount**: Increased from ₹5 lakh to ₹10 lakh per family per year
2. **Beneficiaries**: 50 crore (10 crore families) now covered
3. **Empanelled Hospitals**: 28,000+ across India
4. **Treatments Covered**: 1,949 procedures and therapies
5. **Cashless Treatment**: Available at all empanelled hospitals

**Eligibility Criteria:**

- Families identified in SECC 2011 database
- D1, D2, D3, D4, D5, D6, D7 deprivation categories
- Automatic inclusion for street vendors, rag pickers
- No cap on family size or age

**Implementation Statistics:**

| Metric | Numbers |
|--------|---------|
| Hospital Admissions | 6.5 crore |
| Amount Authorized | ₹85,000 crore |
| Average Claim | ₹13,000 |
| Gender Ratio | 49% female, 51% male |
| Top States | UP, Bihar, MP, Rajasthan |

**New Additions:**

1. **Digital Health ID**: Every beneficiary gets unique health ID
2. **Teleconsultation**: Free online doctor consultation
3. **Health Wellness Centers**: 1.5 lakh centers providing primary care
4. **Medicine Coverage**: Free essential medicines at HWCs

**State-wise Implementation:**

- 33 states/UTs have implemented PMJAY
- Kerala, Tamil Nadu have best performance
- Delhi joined the scheme in 2024
- West Bengal opted out

**Challenges:**

- Awareness in rural areas
- Hospital empanelment delays
- Fraudulent claims
- Quality of care variations

**Comparison with Global Schemes:**

| Scheme | Country | Coverage |
|--------|---------|----------|
| Ayushman Bharat | India | 50 crore |
| Medicare/Medicaid | USA | 10 crore |
| NHS | UK | 6.7 crore |

**For Exam Preparation:**
- Government welfare schemes
- Health sector policies
- Social security programs
- Budget allocations

**Source**: NHA, Ministry of Health`,
        date: 'February 5, 2025',
        source: 'NHA',
      },
      {
        category: 'Technology',
        title: 'India Launches 6G Research Initiative',
        summary: '₹240 crore allocated for 6G technology development. 8 research institutes involved.',
        important: false,
        fullContent: `India has launched the Bharat 6G Research Initiative with an allocation of ₹240 crore to develop indigenous 6G technology and secure early leadership in the next generation of wireless communication.

**Project Overview:**

1. **Budget**: ₹240 crore over 3 years
2. **Duration**: 2024-2027
3. **Implementing Agency**: Centre of Excellence in Wireless Technology (CEWiT)
4. **Participating Institutes**: 8 premier research institutions

**Participating Institutions:**

1. IIT Madras - Lead coordinator
2. IIT Bombay - Network architecture
3. IIT Delhi - AI/ML integration
4. IISc Bangalore - Hardware development
5. IIT Kharagpur - Security protocols
6. IIT Roorkee - Spectrum management
7. IIIT Hyderabad - Edge computing
8. SAMEER - Testing and validation

**6G Technology Goals:**

| Parameter | 5G | 6G (Target) |
|-----------|-----|-------------|
| Speed | 10 Gbps | 1 Tbps |
| Latency | 1 ms | 0.1 ms |
| Frequency | Sub-6 GHz, mmWave | Terahertz (100-300 GHz) |
| Spectrum | Licensed | AI-managed dynamic |
| Energy | Baseline | 50% more efficient |

**Key Research Areas:**

1. **Terahertz Communication**: Ultra-high frequency bands
2. **Intelligent Surfaces**: Reconfigurable smart surfaces
3. **Holographic Communication**: 3D video calls
4. **Digital Twins**: Virtual replicas of physical systems
5. **AI-Native Networks**: Self-optimizing networks
6. **Quantum Communication**: Unhackable communication

**Timeline:**

- 2024-2025: Fundamental research and standardization
- 2025-2026: Prototype development
- 2026-2027: Field trials and testing
- 2028-2030: Commercial deployment expected

**Global 6G Race:**

| Country | Investment | Timeline |
|---------|------------|----------|
| South Korea | $200 million | 2028 |
| Japan | $500 million | 2030 |
| USA | $1.5 billion | 2030 |
| China | $1 billion | 2030 |
| India | $30 million | 2030 |

**Economic Impact:**

- Expected to create 10 lakh jobs
- Contribute $1 trillion to GDP by 2035
- Enable smart cities, autonomous vehicles
- Transform healthcare and education

**For Exam Preparation:**
- Science and technology
- Telecommunication policies
- Digital India initiatives
- Emerging technologies

**Source**: DoT, MeitY`,
        date: 'February 5, 2025',
        source: 'MeitY',
      },
    ],
  };

  const dates = Object.keys(currentAffairs).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'National': 'bg-orange-100 text-orange-700',
      'International': 'bg-blue-100 text-blue-700',
      'Economy': 'bg-green-100 text-green-700',
      'Sports': 'bg-purple-100 text-purple-700',
      'Science': 'bg-cyan-100 text-cyan-700',
      'Defense': 'bg-red-100 text-red-700',
      'Environment': 'bg-emerald-100 text-emerald-700',
      'Technology': 'bg-indigo-100 text-indigo-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  return (
    <section id="current-affairs" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-red-100 text-red-700">
            <Bell className="w-4 h-4 mr-1" />
            Daily Updates
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Current Affairs</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay updated with daily current affairs curated specifically for government exam preparation
          </p>
        </div>

        <Tabs defaultValue={dates[0]} className="w-full">
          <TabsList className="w-full justify-start mb-8 flex-wrap h-auto gap-2">
            {dates.map((date) => (
              <TabsTrigger key={date} value={date} className="px-6 py-3">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </TabsTrigger>
            ))}
          </TabsList>

          {dates.map((date) => (
            <TabsContent key={date} value={date}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Featured News */}
                <div className="lg:col-span-2">
                  <Card 
                    className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white cursor-pointer hover:shadow-xl transition-all"
                    onClick={() => setSelectedNews(currentAffairs[date as keyof typeof currentAffairs].find(n => n.important))}
                  >
                    <CardContent className="p-8">
                      <Badge className="bg-white/20 text-white mb-4">Featured</Badge>
                      <h3 className="text-2xl font-bold mb-4">
                        {currentAffairs[date as keyof typeof currentAffairs].find(n => n.important)?.title}
                      </h3>
                      <p className="text-white/80 mb-6">
                        {currentAffairs[date as keyof typeof currentAffairs].find(n => n.important)?.summary}
                      </p>
                      <Button variant="secondary" className="bg-white text-blue-600 hover:bg-white/90">
                        Read Full Story
                        <ChevronRight className="ml-2 w-4 h-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Stats */}
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Today's Updates</p>
                          <p className="text-3xl font-bold text-gray-900">
                            {currentAffairs[date as keyof typeof currentAffairs].length}
                          </p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <FileText className="w-6 h-6 text-blue-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Important</p>
                          <p className="text-3xl font-bold text-red-600">
                            {currentAffairs[date as keyof typeof currentAffairs].filter(n => n.important).length}
                          </p>
                        </div>
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                          <TrendingUp className="w-6 h-6 text-red-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* News List */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentAffairs[date as keyof typeof currentAffairs].map((news, idx) => (
                  <Card 
                    key={idx} 
                    className={`hover:shadow-lg transition-all cursor-pointer ${news.important ? 'border-l-4 border-l-red-500' : ''}`}
                    onClick={() => setSelectedNews(news)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 flex-wrap">
                        <Badge className={getCategoryColor(news.category)}>
                          {news.category}
                        </Badge>
                        {news.important && (
                          <Badge className="bg-red-100 text-red-700">
                            <Star className="w-3 h-3 mr-1" />
                            Important
                          </Badge>
                        )}
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mt-3">{news.title}</h4>
                      <p className="text-gray-600 mt-2 text-sm">{news.summary}</p>
                      <div className="flex items-center justify-between mt-4">
                        <Button variant="ghost" className="text-blue-600 p-0 h-auto">
                          Read More
                          <ChevronRight className="ml-1 w-4 h-4" />
                        </Button>
                        <span className="text-xs text-gray-400">Source: {news.source}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* News Detail Dialog */}
        <Dialog open={!!selectedNews} onOpenChange={() => setSelectedNews(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh]">
            <DialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <Badge className={getCategoryColor(selectedNews?.category || '')}>
                  {selectedNews?.category}
                </Badge>
                {selectedNews?.important && (
                  <Badge className="bg-red-100 text-red-700">
                    <Star className="w-3 h-3 mr-1" />
                    Important
                  </Badge>
                )}
              </div>
              <DialogTitle className="text-2xl leading-tight">{selectedNews?.title}</DialogTitle>
              <DialogDescription className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {selectedNews?.date} • Source: {selectedNews?.source}
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-[60vh]">
              <div className="p-4">
                <div className="prose prose-blue max-w-none">
                  {selectedNews?.fullContent?.split('\n\n').map((paragraph: string, idx: number) => {
                    if (paragraph.startsWith('**') && paragraph.endsWith(':**')) {
                      return <h3 key={idx} className="text-lg font-bold text-gray-900 mt-6 mb-3">{paragraph.replace(/\*\*/g, '')}</h3>;
                    }
                    if (paragraph.startsWith('1.') || paragraph.startsWith('2.') || paragraph.startsWith('3.') || paragraph.startsWith('4.') || paragraph.startsWith('5.') || paragraph.startsWith('6.') || paragraph.startsWith('7.') || paragraph.startsWith('8.') || paragraph.startsWith('9.') || paragraph.startsWith('10.')) {
                      return <p key={idx} className="text-gray-700 ml-4 mb-2">{paragraph}</p>;
                    }
                    if (paragraph.startsWith('- ')) {
                      return <p key={idx} className="text-gray-700 ml-4 mb-2">{paragraph}</p>;
                    }
                    if (paragraph.startsWith('|')) {
                      // Handle tables
                      const lines = paragraph.split('\n').filter((l: string) => l.trim());
                      if (lines.length > 2) {
                        return (
                          <div key={idx} className="overflow-x-auto my-4">
                            <table className="min-w-full border-collapse border border-gray-300">
                              <tbody>
                                {lines.map((line: string, lidx: number) => {
                                  if (line.includes('---')) return null;
                                  const cells = line.split('|').filter((c: string) => c.trim());
                                  return (
                                    <tr key={lidx} className={lidx === 0 ? 'bg-blue-50' : 'bg-white'}>
                                      {cells.map((cell: string, cidx: number) => (
                                        <td key={cidx} className={`border border-gray-300 px-3 py-2 text-sm ${lidx === 0 ? 'font-semibold' : ''}`}>
                                          {cell.trim()}
                                        </td>
                                      ))}
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        );
                      }
                    }
                    return <p key={idx} className="text-gray-700 mb-4 leading-relaxed">{paragraph.replace(/\*\*/g, '')}</p>;
                  })}
                </div>
              </div>
            </ScrollArea>
            <div className="flex justify-between items-center pt-4 border-t">
              <Button variant="outline" onClick={() => setSelectedNews(null)}>
                Close
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => alert('Share feature coming soon!')}>
                  Share
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => alert('Saved to your notes!')}>
                  Save for Later
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Download Section */}
        <div className="mt-12 text-center">
          <Card className="bg-gray-50 border-dashed border-2">
            <CardContent className="p-8">
              <FileText className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Download Monthly PDF</h3>
              <p className="text-gray-600 mb-4">Get all current affairs compiled in a PDF format for offline study</p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Download February 2025 PDF
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

// Study Materials Section
const StudyMaterialsSection = () => {
  const [selectedTopic, setSelectedTopic] = useState<any>(null);

  const materials = [
    {
      subject: 'General Knowledge',
      icon: '🌍',
      color: 'from-blue-500 to-cyan-500',
      topics: [
        { 
          name: 'Indian History', 
          content: {
            title: 'Indian History - Complete Study Guide',
            sections: [
              {
                heading: 'Ancient India (Prehistoric to 1200 CE)',
                points: [
                  'Indus Valley Civilization (3300-1300 BCE) - Major sites: Harappa, Mohenjo-daro, Lothal',
                  'Vedic Period (1500-500 BCE) - Rigveda, Samaveda, Yajurveda, Atharvaveda',
                  'Mahajanapadas (600-321 BCE) - 16 great kingdoms including Magadha, Kosala, Vatsa',
                  'Mauryan Empire (321-185 BCE) - Chandragupta Maurya, Bindusara, Ashoka the Great',
                  'Gupta Empire (320-550 CE) - Golden Age of India, Chandragupta I, Samudragupta',
                  'Post-Gupta Period - Vardhana dynasty, Harshavardhana'
                ]
              },
              {
                heading: 'Medieval India (1200-1757)',
                points: [
                  'Delhi Sultanate (1206-1526) - Slave dynasty, Khilji, Tughlaq, Sayyid, Lodi',
                  'Vijayanagara Empire (1336-1646) - Krishnadevaraya, Battle of Talikota (1565)',
                  'Mughal Empire (1526-1857) - Babur, Humayun, Akbar, Jahangir, Shah Jahan, Aurangzeb',
                  'Maratha Empire (1674-1818) - Shivaji, Sambhaji, Peshwas',
                  'Important Battles: First Battle of Panipat (1526), Haldighati (1576), Plassey (1757)'
                ]
              },
              {
                heading: 'Modern India (1757-1947)',
                points: [
                  'British East India Company rule (1757-1858) - Subsidiary Alliance, Doctrine of Lapse',
                  'Revolt of 1857 - First War of Independence, Mangal Pandey, Rani Lakshmibai',
                  'Indian National Congress (1885) - Founded by A.O. Hume, first session Bombay',
                  'Freedom Movement - Moderates, Extremists, Revolutionary phase',
                  'Gandhian Era (1915-1947) - Non-Cooperation, Civil Disobedience, Quit India',
                  'Independence (1947) - Mountbatten Plan, Partition, 15 August 1947'
                ]
              }
            ],
            quickFacts: [
              'First Governor-General of Bengal: Warren Hastings (1774)',
              'First Governor-General of India: Lord William Bentinck (1833)',
              'First Viceroy of India: Lord Canning (1858)',
              'Last Viceroy: Lord Mountbatten (1947)',
              'First President of India: Dr. Rajendra Prasad (1950)'
            ]
          }
        },
        { 
          name: 'Geography', 
          content: {
            title: 'Indian Geography - Complete Study Guide',
            sections: [
              {
                heading: 'Physical Features',
                points: [
                  'The Himalayas - Young fold mountains, three parallel ranges: Himadri, Himachal, Shiwalik',
                  'Northern Plains - Formed by Indus, Ganga, Brahmaputra river systems',
                  'Peninsular Plateau - Deccan plateau, Western Ghats, Eastern Ghats',
                  'Coastal Plains - Konkan, Malabar, Coromandel coasts',
                  'Islands - Andaman & Nicobar (volcanic), Lakshadweep (coral)',
                  'Highest Peak: K2 (8611m), Highest in India: Kanchenjunga (8586m)'
                ]
              },
              {
                heading: 'Rivers of India',
                points: [
                  'Himalayan Rivers: Indus, Ganga, Brahmaputra - Perennial, glacier-fed',
                  'Peninsular Rivers: Godavari, Krishna, Kaveri, Mahanadi, Narmada, Tapi - Rain-fed',
                  'Ganga: Longest river in India (2525 km), originates from Gangotri glacier',
                  'Godavari: Dakshina Ganga, longest peninsular river (1465 km)',
                  'Sundarbans: Largest delta in world, formed by Ganga-Brahmaputra'
                ]
              },
              {
                heading: 'Climate & Agriculture',
                points: [
                  'Climate Type: Tropical monsoon climate (Köppen classification)',
                  'Four Seasons: Winter (Dec-Mar), Summer (Apr-Jun), Monsoon (Jun-Sep), Post-monsoon (Oct-Nov)',
                  'Agriculture Types: Shifting, Subsistence, Intensive, Plantation, Mixed',
                  'Major Crops: Rice (largest producer), Wheat, Cotton, Jute, Tea, Sugarcane',
                  'Green Revolution (1966) - M.S. Swaminathan, Norman Borlaug',
                  'White Revolution (1970) - Verghese Kurien, Operation Flood'
                ]
              }
            ],
            quickFacts: [
              'India\'s Area: 3.28 million sq km (7th largest)',
              'Coastline: 7516.6 km (Mainland: 5422.6 km, Islands: 2094 km)',
              'Land Boundary: 15,200 km',
              'Tropic of Cancer passes through: 8 states',
              'Standard Meridian: 82°30\'E (Mirzapur, UP)'
            ]
          }
        },
        { 
          name: 'Polity', 
          content: {
            title: 'Indian Polity - Complete Study Guide',
            sections: [
              {
                heading: 'Constitution of India',
                points: [
                  'Longest written constitution in the world (395 Articles, 12 Schedules)',
                  'Adopted on: 26 November 1949, Enforced: 26 January 1950',
                  'Constituent Assembly: 389 members, Chairman: Dr. Rajendra Prasad',
                  'Drafting Committee: 7 members, Chairman: Dr. B.R. Ambedkar',
                  'Sources: Government of India Act 1935, British Constitution, US Constitution, Irish Constitution',
                  'Preamble: Sovereign, Socialist, Secular, Democratic, Republic'
                ]
              },
              {
                heading: 'Fundamental Rights (Articles 12-35)',
                points: [
                  'Right to Equality (14-18) - Equality before law, No discrimination, Abolition of untouchability',
                  'Right to Freedom (19-22) - Speech, Assembly, Association, Movement, Residence, Profession',
                  'Right against Exploitation (23-24) - Prohibition of human trafficking, Child labor',
                  'Right to Freedom of Religion (25-28) - Freedom of conscience, Religious practices',
                  'Cultural & Educational Rights (29-30) - Minority rights',
                  'Right to Constitutional Remedies (32) - Supreme Court can issue writs'
                ]
              },
              {
                heading: 'Parliament & Government',
                points: [
                  'President: Head of State, Executive, Legislature, Judiciary, Commander-in-Chief',
                  'Vice-President: Chairman of Rajya Sabha',
                  'Parliament: Lok Sabha (545 members), Rajya Sabha (245 members)',
                  'Prime Minister: Head of Government, Leader of majority party',
                  'Supreme Court: 34 judges (max), Chief Justice of India',
                  'Governor: Constitutional head of state, appointed by President'
                ]
              }
            ],
            quickFacts: [
              '42nd Amendment (1976) - Mini Constitution, added Fundamental Duties',
              '44th Amendment (1978) - Removed Right to Property from Fundamental Rights',
              '73rd Amendment (1992) - Panchayati Raj',
              '74th Amendment (1992) - Municipalities',
              '101st Amendment (2016) - GST'
            ]
          }
        },
        { 
          name: 'Economics', 
          content: {
            title: 'Indian Economy - Complete Study Guide',
            sections: [
              {
                heading: 'Economic Planning',
                points: [
                  'Planning Commission (1950-2014) - First Chairman: Jawaharlal Nehru',
                  'NITI Aayog (2015) - Replaced Planning Commission, CEO: B.V.R. Subrahmanyam',
                  'Five Year Plans: 12 plans completed (1951-2017)',
                  'First Plan (1951-56): Focus on Agriculture, Harrod-Domar model',
                  'Second Plan (1956-61): Focus on Industry, P.C. Mahalanobis model',
                  'NITI Aayog: 7 pillars - Health, Education, Agriculture, Governance, Infrastructure, Economy, Innovation'
                ]
              },
              {
                heading: 'Banking & Finance',
                points: [
                  'RBI established: 1 April 1935 (Reserve Bank of India Act 1934)',
                  'Nationalization: 1949 (RBI), 1969 (14 banks), 1980 (6 banks)',
                  'NABARD: National Bank for Agriculture and Rural Development (1982)',
                  'SEBI: Securities and Exchange Board of India (1988, statutory 1992)',
                  'SIDBI: Small Industries Development Bank of India (1990)',
                  'EXIM Bank: Export-Import Bank of India (1982)'
                ]
              },
              {
                heading: 'Taxation & Budget',
                points: [
                  'GST: Goods and Services Tax (1 July 2017) - One Nation, One Tax',
                  'GST Council: 33 members, Chairman: Union Finance Minister',
                  'GST Slabs: 0%, 5%, 12%, 18%, 28%',
                  'Income Tax Slabs (New Regime): 0-3L: 0%, 3-6L: 5%, 6-9L: 10%, 9-12L: 15%, 12-15L: 20%, >15L: 30%',
                  'Union Budget: Presented by Finance Minister, usually on 1st February',
                  'Finance Commission: Article 280, 15th FC (2021-26) - N.K. Singh'
                ]
              }
            ],
            quickFacts: [
              'GDP of India (2024): ~$3.7 trillion (5th largest)',
              'Currency: Indian Rupee (INR), Symbol: ₹',
              'Fiscal Deficit Target: 5.1% of GDP (2024-25)',
              'Inflation Target: 4% ± 2% (RBI)',
              'Forex Reserves: ~$650 billion (2024)'
            ]
          }
        },
        { 
          name: 'Science', 
          content: {
            title: 'General Science - Complete Study Guide',
            sections: [
              {
                heading: 'Physics - Important Concepts',
                points: [
                  'Newton\'s Laws of Motion - First, Second, Third Law',
                  'Archimedes\' Principle - Buoyant force equals weight of displaced fluid',
                  'Ohm\'s Law: V = IR (Voltage = Current × Resistance)',
                  'Speed of Light: 3 × 10^8 m/s',
                  'Sound Waves: Frequency (Hz), Amplitude, Wavelength',
                  'Units: Newton (Force), Joule (Energy), Watt (Power), Pascal (Pressure)'
                ]
              },
              {
                heading: 'Chemistry - Important Concepts',
                points: [
                  'Periodic Table: 118 elements, 7 periods, 18 groups',
                  'pH Scale: 0-14 (Acidic < 7, Neutral = 7, Basic > 7)',
                  'Common Acids: HCl (Hydrochloric), H2SO4 (Sulphuric), HNO3 (Nitric)',
                  'Common Bases: NaOH (Sodium Hydroxide), KOH (Potassium Hydroxide)',
                  'Water Formula: H2O, Hard water contains Ca2+ and Mg2+ ions',
                  'Ozone: O3, protects from UV radiation'
                ]
              },
              {
                heading: 'Biology - Important Concepts',
                points: [
                  'Cell: Basic unit of life, discovered by Robert Hooke (1665)',
                  'Human Body: 206 bones, 639 muscles, 78 organs',
                  'Blood Groups: A, B, AB, O (Universal donor: O-, Universal recipient: AB+)',
                  'Heart: 4 chambers, beats ~72 times/minute',
                  'DNA: Deoxyribonucleic acid, double helix structure',
                  'Photosynthesis: 6CO2 + 6H2O → C6H12O6 + 6O2 (in presence of sunlight)'
                ]
              }
            ],
            quickFacts: [
              'Nobel Prize in Physics 2023: Anne L\'Huillier, Ferenc Krausz, Pierre Agostini',
              'Nobel Prize in Chemistry 2023: Moungi Bawendi, Louis Brus, Alexei Ekimov',
              'Nobel Prize in Medicine 2023: Katalin Karikó, Drew Weissman',
              'ISRO Chairman: S. Somanath',
              'Chandrayaan-3: Landed on Moon (23 Aug 2023), Vikram Lander, Pragyan Rover'
            ]
          }
        }
      ]
    },
    {
      subject: 'Quantitative Aptitude',
      icon: '📊',
      color: 'from-green-500 to-emerald-500',
      topics: [
        { 
          name: 'Number System', 
          content: {
            title: 'Number System - Complete Study Guide',
            sections: [
              {
                heading: 'Types of Numbers',
                points: [
                  'Natural Numbers (N): 1, 2, 3, 4, 5... (Counting numbers)',
                  'Whole Numbers (W): 0, 1, 2, 3, 4... (Natural + Zero)',
                  'Integers (Z): ..., -2, -1, 0, 1, 2... (Positive + Negative + Zero)',
                  'Even Numbers: Divisible by 2 (2, 4, 6, 8...)',
                  'Odd Numbers: Not divisible by 2 (1, 3, 5, 7...)',
                  'Prime Numbers: Only divisible by 1 and itself (2, 3, 5, 7, 11...)'
                ]
              },
              {
                heading: 'Divisibility Rules',
                points: [
                  'Divisible by 2: Last digit is even (0, 2, 4, 6, 8)',
                  'Divisible by 3: Sum of digits divisible by 3',
                  'Divisible by 4: Last two digits divisible by 4',
                  'Divisible by 5: Last digit is 0 or 5',
                  'Divisible by 6: Divisible by both 2 and 3',
                  'Divisible by 8: Last three digits divisible by 8',
                  'Divisible by 9: Sum of digits divisible by 9',
                  'Divisible by 11: Difference of alternate digits is 0 or divisible by 11'
                ]
              },
              {
                heading: 'Important Formulas',
                points: [
                  'HCF × LCM = Product of two numbers',
                  'HCF of fractions = HCF of numerators / LCM of denominators',
                  'LCM of fractions = LCM of numerators / HCF of denominators',
                  'Sum of first n natural numbers: n(n+1)/2',
                  'Sum of first n odd numbers: n²',
                  'Sum of first n even numbers: n(n+1)',
                  'Sum of squares of first n natural numbers: n(n+1)(2n+1)/6'
                ]
              }
            ],
            quickFacts: [
              '2 is the only even prime number',
              '1 is neither prime nor composite',
              'Smallest prime number: 2',
              'Largest 2-digit prime: 97',
              'Co-prime numbers: HCF = 1 (e.g., 8 and 15)'
            ]
          }
        },
        { 
          name: 'Algebra', 
          content: {
            title: 'Algebra - Complete Study Guide',
            sections: [
              {
                heading: 'Basic Algebraic Formulas',
                points: [
                  '(a + b)² = a² + 2ab + b²',
                  '(a - b)² = a² - 2ab + b²',
                  'a² - b² = (a + b)(a - b)',
                  '(a + b)³ = a³ + b³ + 3ab(a + b)',
                  '(a - b)³ = a³ - b³ - 3ab(a - b)',
                  'a³ + b³ = (a + b)(a² - ab + b²)',
                  'a³ - b³ = (a - b)(a² + ab + b²)'
                ]
              },
              {
                heading: 'Linear Equations',
                points: [
                  'Linear equation in one variable: ax + b = 0',
                  'Linear equation in two variables: ax + by + c = 0',
                  'Solution of simultaneous equations: Substitution, Elimination, Cross-multiplication',
                  'Condition for consistency: a1/a2 ≠ b1/b2 (unique solution)',
                  'Quadratic equation: ax² + bx + c = 0',
                  'Quadratic formula: x = [-b ± √(b² - 4ac)] / 2a'
                ]
              },
              {
                heading: 'Progressions',
                points: [
                  'Arithmetic Progression (AP): a, a+d, a+2d, a+3d...',
                  'nth term of AP: Tn = a + (n-1)d',
                  'Sum of n terms of AP: Sn = n/2 [2a + (n-1)d] = n/2 (a + l)',
                  'Geometric Progression (GP): a, ar, ar², ar³...',
                  'nth term of GP: Tn = ar^(n-1)',
                  'Sum of n terms of GP: Sn = a(r^n - 1)/(r - 1) when r ≠ 1'
                ]
              }
            ],
            quickFacts: [
              'Discriminant (D) = b² - 4ac',
              'D > 0: Two distinct real roots',
              'D = 0: Two equal real roots',
              'D < 0: No real roots (complex roots)',
              'Sum of roots = -b/a, Product of roots = c/a'
            ]
          }
        },
        { 
          name: 'Geometry', 
          content: {
            title: 'Geometry - Complete Study Guide',
            sections: [
              {
                heading: 'Triangles',
                points: [
                  'Types: Equilateral (all sides equal), Isosceles (2 sides equal), Scalene (no sides equal)',
                  'Types by angle: Acute (< 90°), Right (= 90°), Obtuse (> 90°)',
                  'Pythagoras Theorem: a² + b² = c² (Right triangle)',
                  'Area of triangle: ½ × base × height',
                  'Heron\'s formula: √[s(s-a)(s-b)(s-c)] where s = (a+b+c)/2',
                  'Sum of angles: 180°',
                  'Exterior angle = Sum of opposite interior angles'
                ]
              },
              {
                heading: 'Circles',
                points: [
                  'Circumference: 2πr or πd',
                  'Area: πr²',
                  'Arc length: (θ/360°) × 2πr',
                  'Sector area: (θ/360°) × πr²',
                  'Chord: Line segment joining two points on circle',
                  'Diameter: Longest chord, passes through center',
                  'Tangent: Touches circle at one point, perpendicular to radius'
                ]
              },
              {
                heading: 'Quadrilaterals & Polygons',
                points: [
                  'Square: All sides equal, all angles 90°, Area = side²',
                  'Rectangle: Opposite sides equal, all angles 90°, Area = l × b',
                  'Parallelogram: Opposite sides parallel, Area = base × height',
                  'Rhombus: All sides equal, Area = ½ × d1 × d2',
                  'Trapezium: One pair parallel sides, Area = ½ × (a+b) × h',
                  'Polygon interior angle sum: (n-2) × 180°',
                  'Regular polygon exterior angle: 360°/n'
                ]
              }
            ],
            quickFacts: [
              'π ≈ 22/7 or 3.14159',
              'Sum of angles in quadrilateral: 360°',
              'Diagonals of square are equal and bisect at 90°',
              'Diagonals of rhombus bisect at 90°',
              'Euler\'s formula: F + V = E + 2 (for polyhedra)'
            ]
          }
        },
        { 
          name: 'Data Interpretation', 
          content: {
            title: 'Data Interpretation - Complete Study Guide',
            sections: [
              {
                heading: 'Types of Charts & Graphs',
                points: [
                  'Bar Chart: Compares quantities across categories',
                  'Pie Chart: Shows proportion/percentage (total = 360°)',
                  'Line Graph: Shows trends over time',
                  'Table: Organized data in rows and columns',
                  'Histogram: Frequency distribution (continuous data)',
                  'Radar Chart: Compares multiple variables'
                ]
              },
              {
                heading: 'Percentage Calculations',
                points: [
                  'Percentage increase: [(New - Old)/Old] × 100',
                  'Percentage decrease: [(Old - New)/Old] × 100',
                  'Successive percentage: a + b + (ab/100)',
                  'If price increases by x%, consumption should decrease by [x/(100+x)] × 100',
                  'Net effect of +20% and -20%: -4% (always loss)',
                  'x% of y = y% of x'
                ]
              },
              {
                heading: 'Ratio & Proportion',
                points: [
                  'Ratio: a:b = a/b (comparison of two quantities)',
                  'Proportion: a:b = c:d (equality of ratios)',
                  'Mean proportion: b² = ac',
                  'Third proportion: b² = ac (find c)',
                  'Fourth proportion: a:b = c:d (find d)',
                  'Componendo: If a/b = c/d, then (a+b)/b = (c+d)/d',
                  'Dividendo: If a/b = c/d, then (a-b)/b = (c-d)/d'
                ]
              }
            ],
            quickFacts: [
              '1% = 1/100 = 0.01',
              '100% increase = Double the original',
              '50% decrease = Half the original',
              'To convert fraction to %: Multiply by 100',
              'To convert % to fraction: Divide by 100'
            ]
          }
        },
        { 
          name: 'Arithmetic', 
          content: {
            title: 'Arithmetic - Complete Study Guide',
            sections: [
              {
                heading: 'Profit & Loss',
                points: [
                  'Cost Price (CP): Price at which article is purchased',
                  'Selling Price (SP): Price at which article is sold',
                  'Profit = SP - CP (when SP > CP)',
                  'Loss = CP - SP (when CP > SP)',
                  'Profit% = (Profit/CP) × 100',
                  'Loss% = (Loss/CP) × 100',
                  'Marked Price (MP): Price before discount',
                  'Discount = MP - SP, Discount% = (Discount/MP) × 100'
                ]
              },
              {
                heading: 'Simple & Compound Interest',
                points: [
                  'Simple Interest (SI): SI = (P × R × T)/100',
                  'Amount (A) = P + SI = P(1 + RT/100)',
                  'Compound Interest (CI): A = P(1 + R/100)^T',
                  'CI = A - P',
                  'For half-yearly: Rate = R/2, Time = 2T',
                  'For quarterly: Rate = R/4, Time = 4T',
                  'Difference between CI and SI for 2 years: P(R/100)²'
                ]
              },
              {
                heading: 'Time, Speed & Distance',
                points: [
                  'Speed = Distance/Time',
                  'Distance = Speed × Time',
                  'Time = Distance/Speed',
                  'km/h to m/s: Multiply by 5/18',
                  'm/s to km/h: Multiply by 18/5',
                  'Relative speed (same direction): S1 - S2',
                  'Relative speed (opposite direction): S1 + S2',
                  'Average speed: 2xy/(x+y) for equal distances'
                ]
              }
            ],
            quickFacts: [
              'If SP is same for two items with x% profit and x% loss: Overall Loss = x²/100%',
              'If CP of two items is same and sold at x% profit and x% loss: No profit no loss',
              'For successive discounts: Equivalent discount = a + b - ab/100',
              'Rule of 72: Years to double = 72/Interest Rate'
            ]
          }
        }
      ]
    },
    {
      subject: 'Reasoning',
      icon: '🧩',
      color: 'from-purple-500 to-violet-500',
      topics: [
        { 
          name: 'Verbal Reasoning', 
          content: {
            title: 'Verbal Reasoning - Complete Study Guide',
            sections: [
              {
                heading: 'Analogy',
                points: [
                  'Word Analogy: Doctor : Hospital :: Teacher : School',
                  'Number Analogy: 2 : 4 :: 3 : 9 (Square relationship)',
                  'Letter Analogy: A : C :: B : D (+2 relationship)',
                  'Types: Synonym, Antonym, Part-Whole, Cause-Effect',
                  'Approach: Find the relationship between first pair, apply to second'
                ]
              },
              {
                heading: 'Classification',
                points: [
                  'Odd One Out: Find the different item in a group',
                  'Examples: Find the odd one - Dog, Cat, Cow, Car (Car is vehicle)',
                  'Types: Word classification, Number classification, Letter classification',
                  'Approach: Find common property among three, identify the different one'
                ]
              },
              {
                heading: 'Series Completion',
                points: [
                  'Number Series: 2, 5, 8, 11, ? (+3 pattern, answer: 14)',
                  'Letter Series: A, C, E, G, ? (+2 letters, answer: I)',
                  'Word Series: CAT, DOG, FISH, ? (animals)',
                  'Common Patterns: +n, -n, ×n, ÷n, n², n³, prime numbers',
                  'Approach: Find the pattern, apply to find next term'
                ]
              }
            ],
            quickFacts: [
              'Most common patterns: Arithmetic (+, -), Geometric (×, ÷), Square, Cube',
              'In letter series: A=1, B=2, C=3... Z=26',
              'Reverse: Z=1, Y=2, X=3... A=26',
              'Vowels: A, E, I, O, U',
              'Consonants: All other letters'
            ]
          }
        },
        { 
          name: 'Non-Verbal', 
          content: {
            title: 'Non-Verbal Reasoning - Complete Study Guide',
            sections: [
              {
                heading: 'Figure Series',
                points: [
                  'Identify the pattern in a sequence of figures',
                  'Common changes: Rotation (90°, 180°, 270°), Reflection, Addition/Removal',
                  'Elements may change position, size, shape, or number',
                  'Approach: Compare consecutive figures, identify transformation',
                  'Practice with clock positions for rotation problems'
                ]
              },
              {
                heading: 'Figure Classification',
                points: [
                  'Find the odd figure among given options',
                  'Look for: Number of sides, number of elements, symmetry',
                  'Check for: Open vs closed figures, filled vs outline',
                  'Compare: Size, position, orientation of elements',
                  'Approach: Find common property, identify the different one'
                ]
              },
              {
                heading: 'Mirror & Water Images',
                points: [
                  'Mirror Image: Lateral inversion (left becomes right)',
                  'Mirror on vertical axis: Left-right reversed',
                  'Water Image: Vertical inversion (top becomes bottom)',
                  'Clock in mirror: Actual time = 11:60 - Mirror time',
                  'Approach: Visualize or draw the reflection'
                ]
              }
            ],
            quickFacts: [
              'Rotation: Clockwise (CW) or Anti-clockwise (ACW)',
              'Symmetry: Line symmetry, Rotational symmetry',
              'Number of sides: Triangle (3), Quadrilateral (4), Pentagon (5), Hexagon (6)',
              'Regular polygon: All sides and angles equal',
              'Convex polygon: All interior angles < 180°'
            ]
          }
        },
        { 
          name: 'Analytical', 
          content: {
            title: 'Analytical Reasoning - Complete Study Guide',
            sections: [
              {
                heading: 'Syllogism',
                points: [
                  'Basic Statements: All A are B, No A are B, Some A are B, Some A are not B',
                  'Conclusions must follow logically from premises',
                  'Venn Diagram method: Draw circles for each category',
                  'Valid conclusions only if necessarily true',
                  'Common errors: Converse, Inverse, Contrapositive confusion'
                ]
              },
              {
                heading: 'Blood Relations',
                points: [
                  'Father\'s father: Grandfather, Father\'s mother: Grandmother',
                  'Father\'s brother: Uncle, Father\'s sister: Aunt',
                  'Mother\'s brother: Maternal Uncle, Mother\'s sister: Maternal Aunt',
                  'Brother\'s/Sister\'s son: Nephew, Daughter: Niece',
                  'Approach: Draw family tree, use + for male, - for female',
                  'Generation gap: Count levels up/down'
                ]
              },
              {
                heading: 'Direction Sense',
                points: [
                  'Cardinal directions: North (N), South (S), East (E), West (W)',
                  'Intercardinal: NE, NW, SE, SW',
                  'Clockwise: N → E → S → W',
                  'Anti-clockwise: N → W → S → E',
                  'Shadow: Morning → West, Noon → None, Evening → East',
                  'Approach: Draw diagram, track position step by step'
                ]
              }
            ],
            quickFacts: [
              'Sun rises in East, sets in West',
              'At sunrise, shadow points West',
              'At sunset, shadow points East',
              'Right angle turn = 90°',
              'Straight angle = 180° (U-turn)'
            ]
          }
        },
        { 
          name: 'Logical', 
          content: {
            title: 'Logical Reasoning - Complete Study Guide',
            sections: [
              {
                heading: 'Statement & Assumptions',
                points: [
                  'Assumption: Unstated premise that supports the statement',
                  'Valid assumption: Must be implicit in the statement',
                  'Not valid: If it restates or adds new information',
                  'Approach: Ask "Is this necessarily true based on statement?"',
                  'Examples help clarify implicit assumptions'
                ]
              },
              {
                heading: 'Statement & Arguments',
                points: [
                  'Strong argument: Directly relevant and addresses the issue',
                  'Weak argument: Irrelevant, ambiguous, or too extreme',
                  'Approach: Evaluate logical strength, not personal opinion',
                  'Check for: Relevance, factual correctness, completeness',
                  'Avoid arguments based on emotion or personal bias'
                ]
              },
              {
                heading: 'Statement & Conclusions',
                points: [
                  'Conclusion: Logical inference from given statement(s)',
                  'Valid: Must necessarily follow from the statement',
                  'Invalid: May be true but not logically derived',
                  'Approach: Check if conclusion is definitely true',
                  'Beware of extreme words: All, None, Always, Never'
                ]
              }
            ],
            quickFacts: [
              'Deductive reasoning: General to specific',
              'Inductive reasoning: Specific to general',
              'Syllogism: Two premises → One conclusion',
              'Valid argument: Premises true → Conclusion must be true',
              'Sound argument: Valid + All premises actually true'
            ]
          }
        },
        { 
          name: 'Puzzles', 
          content: {
            title: 'Puzzles - Complete Study Guide',
            sections: [
              {
                heading: 'Seating Arrangement',
                points: [
                  'Linear: People in a row, facing North or South',
                  'Circular: Around a table, facing center or outward',
                  'Rectangular: Around rectangular table',
                  'Key clues: Position (left, right, between), direction (facing)',
                  'Approach: Draw diagram, fill in definite positions first',
                  'Use elimination for uncertain positions'
                ]
              },
              {
                heading: 'Scheduling',
                points: [
                  'Types: Days of week, Months, Time slots',
                  'Given: Activities, persons, constraints',
                  'Key clues: Before, after, between, immediate, gap of',
                  'Approach: Create table/grid, fill definite information',
                  'Use multiple iterations to narrow down possibilities'
                ]
              },
              {
                heading: 'Input-Output',
                points: [
                  'Given: Input sequence of words/numbers',
                  'Process: Steps that rearrange the input',
                  'Find: Pattern of rearrangement',
                  'Common patterns: Alphabetical, Numerical, Interchanging',
                  'Approach: Compare input and steps, identify operation',
                  'Apply pattern to find any step or output'
                ]
              }
            ],
            quickFacts: [
              'Always read all clues before starting',
              'Start with definite/direct clues',
              'Use elimination method',
              'Draw clear diagrams',
              'Check all constraints at the end'
            ]
          }
        }
      ]
    },
    {
      subject: 'English Language',
      icon: '📚',
      color: 'from-orange-500 to-amber-500',
      topics: [
        { 
          name: 'Grammar', 
          content: {
            title: 'English Grammar - Complete Study Guide',
            sections: [
              {
                heading: 'Parts of Speech',
                points: [
                  'Noun: Name of person, place, thing (Ram, Delhi, Book)',
                  'Pronoun: Replaces noun (he, she, it, they, we)',
                  'Verb: Action word (run, eat, think, is, have)',
                  'Adjective: Describes noun (beautiful, tall, five)',
                  'Adverb: Modifies verb/adjective (quickly, very, always)',
                  'Preposition: Shows relation (in, on, at, under)',
                  'Conjunction: Joins words/clauses (and, but, because)',
                  'Interjection: Expresses emotion (Wow!, Oh!, Alas!)'
                ]
              },
              {
                heading: 'Tenses',
                points: [
                  'Simple Present: I eat (habits, facts)',
                  'Present Continuous: I am eating (ongoing action)',
                  'Present Perfect: I have eaten (completed action)',
                  'Present Perfect Continuous: I have been eating (duration)',
                  'Simple Past: I ate (completed past action)',
                  'Past Continuous: I was eating (past ongoing)',
                  'Past Perfect: I had eaten (before another past action)',
                  'Simple Future: I will eat (future action)',
                  'Future Continuous: I will be eating (future ongoing)',
                  'Future Perfect: I will have eaten (completed by future time)'
                ]
              },
              {
                heading: 'Active & Passive Voice',
                points: [
                  'Active: Subject performs action (Ram eats an apple)',
                  'Passive: Subject receives action (An apple is eaten by Ram)',
                  'Structure: Object + be verb + past participle + by + Subject',
                  'Present Simple: is/am/are + V3',
                  'Past Simple: was/were + V3',
                  'Future Simple: will be + V3',
                  'Perfect: has/have/had been + V3'
                ]
              }
            ],
            quickFacts: [
              'Subject-Verb Agreement: Singular subject → Singular verb',
              'Collective nouns can take singular or plural verb',
              'Neither...nor, Either...or: Verb agrees with nearest subject',
              'Articles: a (consonant sound), an (vowel sound), the (specific)',
              'Countable nouns: a/an/the, Uncountable: the/no article'
            ]
          }
        },
        { 
          name: 'Vocabulary', 
          content: {
            title: 'Vocabulary - Complete Study Guide',
            sections: [
              {
                heading: 'Synonyms (Similar Meaning)',
                points: [
                  'Abundant: Plentiful, Ample, Copious',
                  'Benevolent: Kind, Generous, Charitable',
                  'Candid: Frank, Honest, Straightforward',
                  'Diligent: Hardworking, Industrious, Assiduous',
                  'Eloquent: Articulate, Fluent, Expressive',
                  'Frugal: Thrifty, Economical, Sparing',
                  'Genuine: Authentic, Real, True',
                  'Humble: Modest, Unassuming, Meek'
                ]
              },
              {
                heading: 'Antonyms (Opposite Meaning)',
                points: [
                  'Accept: Reject, Refuse, Decline',
                  'Brave: Cowardly, Timid, Fearful',
                  'Create: Destroy, Ruin, Demolish',
                  'Difficult: Easy, Simple, Effortless',
                  'Expand: Contract, Shrink, Compress',
                  'Famous: Unknown, Obscure, Anonymous',
                  'Generous: Stingy, Miserly, Selfish',
                  'Happy: Sad, Unhappy, Miserable'
                ]
              },
              {
                heading: 'One Word Substitution',
                points: [
                  'One who cannot read or write: Illiterate',
                  'One who walks in sleep: Somnambulist',
                  'Fear of water: Hydrophobia',
                  'Fear of heights: Acrophobia',
                  'A place where birds are kept: Aviary',
                  'A place where bees are kept: Apiary',
                  'Murder of a king: Regicide',
                  'Murder of oneself: Suicide'
                ]
              }
            ],
            quickFacts: [
              'Root words help understand meaning: Bio (life), Graph (write), Logy (study)',
              'Prefixes change meaning: Un- (not), Re- (again), Mis- (wrong)',
              'Suffixes change word class: -tion (noun), -ful (adjective), -ly (adverb)',
              'Read newspapers daily to improve vocabulary',
              'Maintain a vocabulary notebook'
            ]
          }
        },
        { 
          name: 'Comprehension', 
          content: {
            title: 'Reading Comprehension - Complete Study Guide',
            sections: [
              {
                heading: 'Types of Questions',
                points: [
                  'Main Idea: What is the passage mainly about?',
                  'Title: Which is the most suitable title?',
                  'Specific Detail: According to the passage, what...?',
                  'Inference: What can be inferred from...?',
                  'Tone: What is the author\'s attitude/tone?',
                  'Vocabulary in Context: What does X mean in the passage?'
                ]
              },
              {
                heading: 'Reading Strategies',
                points: [
                  'Skim first: Read first and last paragraph, topic sentences',
                  'Identify topic: What is the passage about?',
                  'Identify main idea: What is the author\'s main point?',
                  'Look for keywords: However, Therefore, In contrast, For example',
                  'Read questions first: Know what to look for',
                  'Refer back: Don\'t rely on memory, check passage'
                ]
              },
              {
                heading: 'Common Tones',
                points: [
                  'Objective: Neutral, factual, unbiased',
                  'Subjective: Personal opinion, biased',
                  'Critical: Finding faults, negative evaluation',
                  'Appreciative: Praising, positive evaluation',
                  'Sarcastic: Mocking, ironic',
                  'Humorous: Funny, amusing',
                  'Didactic: Teaching, instructive',
                  'Pessimistic: Negative outlook',
                  'Optimistic: Positive outlook'
                ]
              }
            ],
            quickFacts: [
              'Read the passage once quickly for overview',
              'Read questions before detailed reading',
              'Eliminate obviously wrong options',
              'Answer based on passage, not outside knowledge',
              'Manage time: Don\'t spend too long on one passage'
            ]
          }
        },
        { 
          name: 'Cloze Test', 
          content: {
            title: 'Cloze Test - Complete Study Guide',
            sections: [
              {
                heading: 'What is Cloze Test?',
                points: [
                  'A passage with blanks where words are removed',
                  'Candidate fills in the blanks with appropriate words',
                  'Tests: Vocabulary, Grammar, Context understanding',
                  'Usually 5-10 blanks in a passage of 100-150 words',
                  'Options may or may not be given'
                ]
              },
              {
                heading: 'Approach to Solve',
                points: [
                  'Read the complete passage first without filling blanks',
                  'Understand the theme and context of the passage',
                  'Identify the part of speech needed for each blank',
                  'Look for grammatical clues: Tense, Subject-verb agreement',
                  'Check for connecting words: And, But, However, Therefore',
                  'Eliminate options that don\'t fit grammatically',
                  'Re-read the passage after filling all blanks'
                ]
              },
              {
                heading: 'Common Clues',
                points: [
                  'Articles (a, an, the): Indicate noun follows',
                  'Prepositions: Show relationship (in, on, at, with)',
                  'Conjunctions: Connect ideas (and, but, or, so)',
                  'Pronouns: Refer back to nouns (he, she, it, they)',
                  'Tense markers: Already, Yet, Just, Ever (Perfect tense)',
                  'Contrast words: However, Although, Despite, But'
                ]
              }
            ],
            quickFacts: [
              'Context is more important than individual word meaning',
              'Collocations matter: "Make a decision" not "Do a decision"',
              'Check if word fits grammatically and logically',
              'Don\'t leave any blank unanswered',
              'Practice with previous year papers'
            ]
          }
        },
        { 
          name: 'Error Detection', 
          content: {
            title: 'Error Detection - Complete Study Guide',
            sections: [
              {
                heading: 'Common Error Types',
                points: [
                  'Subject-Verb Agreement: The boys are playing (not is)',
                  'Tense Errors: He went yesterday (not has gone)',
                  'Pronoun Errors: Between you and me (not I)',
                  'Preposition Errors: Depend on (not upon in modern usage)',
                  'Article Errors: An honest man (not a)',
                  'Adjective-Adverb confusion: He runs fast (not fastly)',
                  'Double negatives: I don\'t know nothing (incorrect)'
                ]
              },
              {
                heading: 'Spotting Errors Approach',
                points: [
                  'Read the sentence carefully',
                  'Identify the subject and check verb agreement',
                  'Check tense consistency throughout',
                  'Look for preposition errors',
                  'Verify pronoun usage (case, number, gender)',
                  'Check for redundancy or repetition',
                  'If no error, mark "No error" option'
                ]
              },
              {
                heading: 'Sentence Improvement',
                points: [
                  'Identify the error in the given sentence',
                  'Look for the option that corrects it',
                  'Ensure the meaning remains unchanged',
                  'Check all options before selecting',
                  'Sometimes "No improvement" is correct',
                  'Avoid options that change the meaning'
                ]
              }
            ],
            quickFacts: [
              'Neither/Either + singular verb',
              'None + singular or plural verb (both acceptable)',
              'Each/Every + singular verb',
              'Many a + singular verb (Many a man is...)',
              'The number of + singular verb',
              'A number of + plural verb'
            ]
          }
        }
      ]
    },
    {
      subject: 'Computer Awareness',
      icon: '💻',
      color: 'from-pink-500 to-rose-500',
      topics: [
        { 
          name: 'Basics', 
          content: {
            title: 'Computer Basics - Complete Study Guide',
            sections: [
              {
                heading: 'Computer Fundamentals',
                points: [
                  'Computer: Electronic device that accepts data, processes it, gives output',
                  'Full form: Commonly Operating Machine Particularly Used for Trade, Education and Research',
                  'Father of Computer: Charles Babbage (Analytical Engine)',
                  'Father of Modern Computer: Alan Turing',
                  'First Computer: ENIAC (1946) - Electronic Numerical Integrator and Computer',
                  'First Generation: Vacuum tubes, Second: Transistors, Third: ICs, Fourth: Microprocessors, Fifth: AI'
                ]
              },
              {
                heading: 'Hardware Components',
                points: [
                  'CPU: Central Processing Unit - Brain of computer (ALU + CU + MU)',
                  'ALU: Arithmetic Logic Unit - performs calculations',
                  'CU: Control Unit - controls operations',
                  'MU: Memory Unit - stores data and instructions',
                  'RAM: Random Access Memory - volatile, temporary storage',
                  'ROM: Read Only Memory - non-volatile, permanent',
                  'Hard Disk: Permanent storage, measured in GB/TB',
                  'Input Devices: Keyboard, Mouse, Scanner, Webcam',
                  'Output Devices: Monitor, Printer, Speaker'
                ]
              },
              {
                heading: 'Software',
                points: [
                  'Software: Set of programs that instruct computer',
                  'System Software: Operating System, Device Drivers, Utilities',
                  'Application Software: Programs for specific tasks (MS Word, Browser)',
                  'Operating System: Interface between user and hardware',
                  'Examples: Windows, Linux, macOS, Android, iOS',
                  'Firmware: Software embedded in hardware (BIOS)'
                ]
              }
            ],
            quickFacts: [
              '1 Byte = 8 Bits',
              '1 KB = 1024 Bytes',
              '1 MB = 1024 KB',
              '1 GB = 1024 MB',
              '1 TB = 1024 GB',
              'Binary: 0 and 1, Hexadecimal: 0-9 and A-F'
            ]
          }
        },
        { 
          name: 'MS Office', 
          content: {
            title: 'MS Office - Complete Study Guide',
            sections: [
              {
                heading: 'MS Word',
                points: [
                  'MS Word: Word processing software',
                  'File Extension: .doc (old), .docx (new)',
                  'Default Font: Calibri (11 pt)',
                  'Shortcut Keys: Ctrl+S (Save), Ctrl+C (Copy), Ctrl+V (Paste)',
                  'Ctrl+B (Bold), Ctrl+I (Italic), Ctrl+U (Underline)',
                  'Ctrl+Z (Undo), Ctrl+Y (Redo), Ctrl+F (Find)',
                  'Ctrl+P (Print), Ctrl+N (New), Ctrl+O (Open)',
                  'Mail Merge: Create multiple documents from template'
                ]
              },
              {
                heading: 'MS Excel',
                points: [
                  'MS Excel: Spreadsheet software',
                  'File Extension: .xls (old), .xlsx (new)',
                  'Workbook: Collection of worksheets',
                  'Cell: Intersection of row and column (e.g., A1, B2)',
                  'Formula starts with = sign',
                  'SUM: Adds values, AVERAGE: Mean value, COUNT: Counts cells',
                  'MAX: Maximum value, MIN: Minimum value',
                  'IF: Conditional function, VLOOKUP: Vertical lookup'
                ]
              },
              {
                heading: 'MS PowerPoint',
                points: [
                  'MS PowerPoint: Presentation software',
                  'File Extension: .ppt (old), .pptx (new)',
                  'Slide: Single page of presentation',
                  'Slide Layout: Pre-designed arrangement of content',
                  'Animation: Effect on individual elements',
                  'Transition: Effect between slides',
                  'F5: Start from beginning, Shift+F5: Start from current slide',
                  'Slide Master: Controls overall design of presentation'
                ]
              }
            ],
            quickFacts: [
              'MS Office developed by Microsoft',
              'First released: 1990 (Office 1.0)',
              'Latest version: Microsoft 365 (subscription)',
              'OneNote: Note-taking app',
              'Outlook: Email client',
              'Access: Database management',
              'Publisher: Desktop publishing'
            ]
          }
        },
        { 
          name: 'Internet', 
          content: {
            title: 'Internet - Complete Study Guide',
            sections: [
              {
                heading: 'Internet Basics',
                points: [
                  'Internet: Global network of interconnected computers',
                  'WWW: World Wide Web - information system on Internet',
                  'Difference: Internet is infrastructure, WWW is service on it',
                  'URL: Uniform Resource Locator - web address',
                  'HTTP: HyperText Transfer Protocol (not secure)',
                  'HTTPS: HTTP Secure - encrypted connection',
                  'Browser: Software to access web (Chrome, Firefox, Edge)',
                  'Search Engine: Google, Bing, Yahoo - indexes web pages'
                ]
              },
              {
                heading: 'Email',
                points: [
                  'Email: Electronic mail - sending messages over Internet',
                  'Format: username@domain.com',
                  'Gmail: Google\'s email service (15 GB free)',
                  'CC: Carbon Copy - secondary recipients',
                  'BCC: Blind Carbon Copy - hidden recipients',
                  'Attachment: File sent with email',
                  'Subject: Brief description of email content',
                  'Spam: Unwanted/junk emails'
                ]
              },
              {
                heading: 'Social Media & Cloud',
                points: [
                  'Social Media: Platforms for sharing content and connecting',
                  'Examples: Facebook, Twitter/X, Instagram, LinkedIn',
                  'Cloud Computing: Storing and accessing data over Internet',
                  'Examples: Google Drive, Dropbox, OneDrive, iCloud',
                  'Advantages: Access from anywhere, automatic backup, sharing',
                  'E-commerce: Buying/selling online (Amazon, Flipkart)',
                  'E-learning: Online education platforms',
                  'E-governance: Government services online'
                ]
              }
            ],
            quickFacts: [
              'Internet invented: 1969 (ARPANET)',
              'WWW invented: 1989 by Tim Berners-Lee',
              'First website: info.cern.ch',
              'India\'s internet users: ~900 million (2024)',
              'IP Address: Unique identifier for devices',
              'Domain: .com (commercial), .org (organization), .gov (government), .edu (education)'
            ]
          }
        },
        { 
          name: 'Networking', 
          content: {
            title: 'Computer Networking - Complete Study Guide',
            sections: [
              {
                heading: 'Network Types',
                points: [
                  'LAN: Local Area Network - small area (home, office)',
                  'WAN: Wide Area Network - spans cities/countries (Internet)',
                  'MAN: Metropolitan Area Network - city-wide',
                  'PAN: Personal Area Network - personal devices (Bluetooth)',
                  'VPN: Virtual Private Network - secure remote connection',
                  'Wi-Fi: Wireless LAN using radio waves',
                  'Ethernet: Wired LAN connection'
                ]
              },
              {
                heading: 'Network Devices',
                points: [
                  'Router: Connects multiple networks, directs traffic',
                  'Switch: Connects devices within same network',
                  'Modem: Converts digital to analog signals (Modulator-Demodulator)',
                  'Hub: Connects multiple devices (broadcasts to all)',
                  'Bridge: Connects two LAN segments',
                  'Gateway: Connects networks with different protocols',
                  'Firewall: Security device that monitors network traffic',
                  'NIC: Network Interface Card - connects computer to network'
                ]
              },
              {
                heading: 'Network Protocols',
                points: [
                  'TCP/IP: Transmission Control Protocol/Internet Protocol - foundation of Internet',
                  'HTTP/HTTPS: Web browsing protocols',
                  'FTP: File Transfer Protocol - transferring files',
                  'SMTP: Simple Mail Transfer Protocol - sending emails',
                  'POP3/IMAP: Receiving emails',
                  'DNS: Domain Name System - converts domain to IP address',
                  'DHCP: Dynamic Host Configuration Protocol - assigns IP addresses'
                ]
              }
            ],
            quickFacts: [
              'Bandwidth: Data transfer capacity (Mbps, Gbps)',
              'Latency: Delay in data transmission',
              'Packet: Unit of data transmitted over network',
              'Topology: Physical arrangement (Star, Bus, Ring, Mesh)',
              'MAC Address: Hardware address of network device',
              'Port: Virtual point for network connection (HTTP: 80, HTTPS: 443)'
            ]
          }
        },
        { 
          name: 'Cyber Security', 
          content: {
            title: 'Cyber Security - Complete Study Guide',
            sections: [
              {
                heading: 'Types of Cyber Threats',
                points: [
                  'Virus: Malicious program that replicates and damages',
                  'Worm: Self-replicating program that spreads through network',
                  'Trojan: Malware disguised as legitimate software',
                  'Ransomware: Encrypts files, demands payment for decryption',
                  'Spyware: Secretly monitors user activity',
                  'Phishing: Fraudulent attempt to obtain sensitive information',
                  'Malware: General term for malicious software',
                  'Adware: Displays unwanted advertisements'
                ]
              },
              {
                heading: 'Security Measures',
                points: [
                  'Antivirus: Software that detects and removes malware',
                  'Firewall: Monitors and controls network traffic',
                  'Encryption: Converting data to unreadable format',
                  'Password: Secret code for authentication',
                  'Two-Factor Authentication (2FA): Two-step verification',
                  'Biometric: Fingerprint, face recognition, iris scan',
                  'Backup: Copying data for recovery',
                  'Patch: Software update fixing security vulnerabilities'
                ]
              },
              {
                heading: 'Safe Practices',
                points: [
                  'Use strong passwords (mix of letters, numbers, symbols)',
                  'Don\'t click suspicious links or attachments',
                  'Keep software and OS updated',
                  'Use antivirus and firewall',
                  'Don\'t share personal information online',
                  'Log out from public computers',
                  'Use HTTPS websites for transactions',
                  'Regularly backup important data'
                ]
              }
            ],
            quickFacts: [
              'CERT-In: Indian Computer Emergency Response Team',
              'Cyber Swachhta Kendra: Botnet cleaning center',
              'IT Act 2000: India\'s cyber law',
              'Section 66: Hacking with computer system',
              'Digital Signature: Electronic authentication',
              'SSL Certificate: Secures website connections'
            ]
          }
        }
      ]
    },
    {
      subject: 'Static GK',
      icon: '📖',
      color: 'from-red-500 to-rose-500',
      topics: [
        { 
          name: 'Awards', 
          content: {
            title: 'Important Awards - Complete Study Guide',
            sections: [
              {
                heading: 'National Awards (India)',
                points: [
                  'Bharat Ratna: Highest civilian award (1954)',
                  'Padma Vibhushan: Second highest civilian award',
                  'Padma Bhushan: Third highest civilian award',
                  'Padma Shri: Fourth highest civilian award',
                  'Param Vir Chakra: Highest military gallantry award',
                  'Maha Vir Chakra: Second highest military award',
                  'Vir Chakra: Third highest military award',
                  'Ashoka Chakra: Highest peacetime gallantry award'
                ]
              },
              {
                heading: 'International Awards',
                points: [
                  'Nobel Prize: Established 1895 (Alfred Nobel)',
                  'Categories: Physics, Chemistry, Medicine, Literature, Peace, Economics',
                  'First Indian Nobel: Rabindranath Tagore (Literature, 1913)',
                  'Oscar/Academy Awards: Film awards (USA)',
                  'Golden Globe: Film and TV awards',
                  'Grammy Awards: Music awards',
                  'Booker Prize: Literary award',
                  'Pulitzer Prize: Journalism and literature (USA)'
                ]
              },
              {
                heading: 'Sports Awards',
                points: [
                  'Rajiv Gandhi Khel Ratna: Highest sports honor in India',
                  'Arjuna Award: Outstanding performance in sports',
                  'Dronacharya Award: Coaching excellence',
                  'Dhyan Chand Award: Lifetime achievement in sports',
                  'FIFA World Cup: Football (4 years)',
                  'Cricket World Cup: ICC tournament (4 years)',
                  'Olympics: Multi-sport event (4 years)',
                  'Asian Games: Asian multi-sport event (4 years)'
                ]
              }
            ],
            quickFacts: [
              'First Bharat Ratna: C. Rajagopalachari, Sarvepalli Radhakrishnan, C.V. Raman (1954)',
              'Youngest Bharat Ratna: Sachin Tendulkar (40 years)',
              'Most Nobel Prizes: USA (400+)',
              'First Indian Oscar: Bhanu Athaiya (Costume Design, 1983)',
              'Olympics started: 1896 (Athens)',
              'India\'s first Olympic gold: 1928 (Hockey)'
            ]
          }
        },
        { 
          name: 'Books & Authors', 
          content: {
            title: 'Important Books & Authors - Complete Study Guide',
            sections: [
              {
                heading: 'Indian Authors & Books',
                points: [
                  'Rabindranath Tagore: Gitanjali, The Home and the World',
                  'R.K. Narayan: Malgudi Days, The Guide',
                  'Mulk Raj Anand: Untouchable, Coolie',
                  'Khushwant Singh: Train to Pakistan, The Company of Women',
                  'Chetan Bhagat: Five Point Someone, 2 States',
                  'Arundhati Roy: The God of Small Things (Booker Prize 1997)',
                  'Kiran Desai: The Inheritance of Loss (Booker Prize 2006)',
                  'Salman Rushdie: Midnight\'s Children (Booker Prize 1981)'
                ]
              },
              {
                heading: 'International Authors & Books',
                points: [
                  'William Shakespeare: Hamlet, Macbeth, Romeo and Juliet',
                  'Charles Dickens: Oliver Twist, A Tale of Two Cities',
                  'Jane Austen: Pride and Prejudice, Sense and Sensibility',
                  'George Orwell: 1984, Animal Farm',
                  'J.K. Rowling: Harry Potter series',
                  'Agatha Christie: Murder on the Orient Express',
                  'Ernest Hemingway: The Old Man and the Sea',
                  'Mark Twain: The Adventures of Tom Sawyer'
                ]
              },
              {
                heading: 'Important Indian Literary Works',
                points: [
                  'Ramayana: Valmiki (Sanskrit), Tulsidas (Hindi - Ramcharitmanas)',
                  'Mahabharata: Vyasa - Longest epic poem',
                  'Bhagavad Gita: Part of Mahabharata, 700 verses',
                  'Arthashastra: Chanakya (Kautilya) - Economics and politics',
                  'Indica: Megasthenes - Account of Mauryan India',
                  'Discovery of India: Jawaharlal Nehru',
                  'The Argumentative Indian: Amartya Sen',
                  'India After Gandhi: Ramachandra Guha'
                ]
              }
            ],
            quickFacts: [
              'Mahabharata: Longest epic (100,000 shlokas)',
              'Gitanjali: Made Tagore first Asian Nobel laureate',
              'First novel in English by Indian: Rajmohan\'s Wife (Bankim Chandra)',
              'Jnanpith Award: Highest literary award in India',
              'Sahitya Akademi: National academy of letters',
              'First Jnanpith winner: G. Sankara Kurup (1965)'
            ]
          }
        },
        { 
          name: 'Sports', 
          content: {
            title: 'Sports GK - Complete Study Guide',
            sections: [
              {
                heading: 'Cricket',
                points: [
                  'ICC: International Cricket Council (Headquarters: Dubai)',
                  'Formats: Test, ODI (50 overs), T20 (20 overs)',
                  'World Cup Winners: 1975,1979,1983,1987,1992,1996,1999,2003,2007,2011,2015,2019,2023',
                  'India won: 1983, 2011 (ODI), 2007 (T20), 2025 (Champions Trophy)',
                  'IPL: Indian Premier League (Started 2008)',
                  'Most runs in Tests: Sachin Tendulkar (15,921)',
                  'Most wickets in Tests: Muttiah Muralitharan (800)',
                  'Highest individual score: 400* (Brian Lara)'
                ]
              },
              {
                heading: 'Football',
                points: [
                  'FIFA: Fédération Internationale de Football Association',
                  'Headquarters: Zurich, Switzerland',
                  'World Cup: Started 1930 (Uruguay), Every 4 years',
                  'Most titles: Brazil (5 times)',
                  'India\'s FIFA ranking: ~100 (2024)',
                  'ISL: Indian Super League (Started 2014)',
                  'I-League: Previous top-tier league',
                  'Sunil Chhetri: India\'s highest goal scorer'
                ]
              },
              {
                heading: 'Olympics & Other Sports',
                points: [
                  'Olympics: Started 1896 (Athens), Every 4 years',
                  'Summer Olympics: 2024 Paris, 2028 Los Angeles',
                  'Winter Olympics: Separate event for winter sports',
                  'IOA: Indian Olympic Association',
                  'India\'s first individual gold: Abhinav Bindra (2008, Shooting)',
                  'Neeraj Chopra: Gold in Javelin Throw (Tokyo 2020)',
                  'PV Sindhu: Badminton silver (2016), bronze (2020)',
                  'Hockey: India\'s national game, 8 Olympic golds'
                ]
              }
            ],
            quickFacts: [
              'Sachin Tendulkar: "God of Cricket", 100 international centuries',
              'MS Dhoni: Only captain to win all ICC trophies',
              'Virat Kohli: Most runs in T20 Internationals',
              'Rohit Sharma: Highest individual ODI score (264)',
              'Mithali Raj: Highest run-scorer in women\'s ODIs',
              'Mary Kom: Only woman boxer with 6 world championships'
            ]
          }
        },
        { 
          name: 'Important Days', 
          content: {
            title: 'Important Days - Complete Study Guide',
            sections: [
              {
                heading: 'National Days (India)',
                points: [
                  'Republic Day: 26 January (1950)',
                  'Independence Day: 15 August (1947)',
                  'Gandhi Jayanti: 2 October (Birth anniversary)',
                  'Constitution Day: 26 November (Adoption day)',
                  'National Youth Day: 12 January (Swami Vivekananda\'s birthday)',
                  'National Science Day: 28 February (Raman Effect discovery)',
                  'National Unity Day: 31 October (Sardar Patel\'s birthday)',
                  'National Education Day: 11 November (Maulana Azad\'s birthday)'
                ]
              },
              {
                heading: 'International Days',
                points: [
                  'New Year\'s Day: 1 January',
                  'International Women\'s Day: 8 March',
                  'World Environment Day: 5 June',
                  'World Population Day: 11 July',
                  'Independence Day (USA): 4 July',
                  'World Health Day: 7 April',
                  'World AIDS Day: 1 December',
                  'Human Rights Day: 10 December'
                ]
              },
              {
                heading: 'UN Observances',
                points: [
                  'UN Day: 24 October (UN Charter 1945)',
                  'World Water Day: 22 March',
                  'Earth Day: 22 April',
                  'World Oceans Day: 8 June',
                  'International Day of Yoga: 21 June',
                  'World Tourism Day: 27 September',
                  'World Food Day: 16 October',
                  'International Day of Persons with Disabilities: 3 December'
                ]
              }
            ],
            quickFacts: [
              'Why 26 January? Congress demanded Purna Swaraj in 1930',
              'First Republic Day: 26 January 1950',
              'Constitution took 2 years 11 months 18 days to make',
              'Longest written constitution: Indian Constitution',
              'UN founded: 24 October 1945',
              'India joined UN: 30 October 1945'
            ]
          }
        },
        { 
          name: 'Organizations', 
          content: {
            title: 'Important Organizations - Complete Study Guide',
            sections: [
              {
                heading: 'International Organizations',
                points: [
                  'UN: United Nations (1945), HQ: New York, USA',
                  'UNSC: UN Security Council - 5 permanent members (P5)',
                  'UNGA: UN General Assembly - All member states',
                  'WHO: World Health Organization (1948), HQ: Geneva',
                  'UNESCO: UN Educational, Scientific and Cultural Organization',
                  'IMF: International Monetary Fund (1944), HQ: Washington DC',
                  'World Bank: International Bank for Reconstruction and Development',
                  'WTO: World Trade Organization (1995), HQ: Geneva'
                ]
              },
              {
                heading: 'Regional Organizations',
                points: [
                  'SAARC: South Asian Association for Regional Cooperation (1985)',
                  'Members: India, Pakistan, Bangladesh, Sri Lanka, Nepal, Bhutan, Maldives, Afghanistan',
                  'ASEAN: Association of Southeast Asian Nations (1967)',
                  'EU: European Union (1993), 27 member countries',
                  'NATO: North Atlantic Treaty Organization (1949)',
                  'African Union: 55 member states',
                  'G20: Group of 20 major economies',
                  'BRICS: Brazil, Russia, India, China, South Africa'
                ]
              },
              {
                heading: 'Indian Organizations',
                points: [
                  'ISRO: Indian Space Research Organisation (1969), HQ: Bengaluru',
                  'DRDO: Defence Research and Development Organisation (1958)',
                  'BARC: Bhabha Atomic Research Centre (1957), Trombay',
                  'CSIR: Council of Scientific and Industrial Research (1942)',
                  'NITI Aayog: National Institution for Transforming India (2015)',
                  'Election Commission: Constitutional body (Article 324)',
                  'CAG: Comptroller and Auditor General (Article 148)',
                  'UPSC: Union Public Service Commission (Article 315)'
                ]
              }
            ],
            quickFacts: [
              'UN Members: 193 countries',
              'UN Official Languages: 6 (English, French, Spanish, Russian, Chinese, Arabic)',
              'UN Secretary-General: António Guterres (Portugal)',
              'WHO Director-General: Tedros Adhanom',
              'IMF Managing Director: Kristalina Georgieva',
              'World Bank President: Ajay Banga (first Indian-American)'
            ]
          }
        }
      ]
    },
  ];

  return (
    <section id="study-materials" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-green-100 text-green-700">Free Resources</Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Study Materials</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive study materials covering all subjects for government exam preparation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {materials.map((material, idx) => (
            <Card key={idx} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${material.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}>
                  {material.icon}
                </div>
                <CardTitle className="text-xl">{material.subject}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {material.topics.map((topic: any, tidx: number) => (
                    <button
                      key={tidx}
                      onClick={() => setSelectedTopic(topic)}
                      className="w-full flex items-center text-left text-gray-600 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors"
                    >
                      <ChevronRight className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
                      <span className="text-sm">{topic.name}</span>
                    </button>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-6" onClick={() => setSelectedTopic(material.topics[0])}>
                  <BookOpen className="w-4 h-4 mr-2" />
                  Start Learning
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Topic Detail Dialog */}
        <Dialog open={!!selectedTopic} onOpenChange={() => setSelectedTopic(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedTopic?.content?.title}</DialogTitle>
              <DialogDescription>Complete study guide with important concepts and quick facts</DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-[65vh]">
              <div className="p-4 space-y-6">
                {/* Sections */}
                {selectedTopic?.content?.sections.map((section: any, idx: number) => (
                  <div key={idx} className="bg-white rounded-lg border p-4">
                    <h3 className="text-lg font-bold text-blue-700 mb-3 flex items-center">
                      <BookOpen className="w-5 h-5 mr-2" />
                      {section.heading}
                    </h3>
                    <ul className="space-y-2">
                      {section.points.map((point: string, pidx: number) => (
                        <li key={pidx} className="flex items-start text-gray-700 text-sm">
                          <span className="text-blue-500 mr-2 mt-1">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {/* Quick Facts */}
                {selectedTopic?.content?.quickFacts && (
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200 p-4">
                    <h3 className="text-lg font-bold text-amber-700 mb-3 flex items-center">
                      <Star className="w-5 h-5 mr-2" />
                      Quick Facts (Important for Exams)
                    </h3>
                    <ul className="space-y-2">
                      {selectedTopic.content.quickFacts.map((fact: string, fidx: number) => (
                        <li key={fidx} className="flex items-start text-gray-700 text-sm">
                          <span className="text-amber-500 mr-2 mt-1">★</span>
                          <span>{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </ScrollArea>
            <div className="flex justify-between items-center pt-4 border-t">
              <Button variant="outline" onClick={() => setSelectedTopic(null)}>
                Close
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => alert('Download PDF feature coming soon!')}>
                  <FileText className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => alert('Saved to your notes!')}>
                  <Award className="w-4 h-4 mr-2" />
                  Save for Revision
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Additional Resources */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
            <CardContent className="p-8 text-center">
              <FileText className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Previous Year Papers</h3>
              <p className="text-white/80 mb-4">10+ years of solved question papers</p>
              <Button variant="secondary" className="bg-white text-blue-600">Access Now</Button>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-600 to-pink-600 text-white">
            <CardContent className="p-8 text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Topic-wise Quizzes</h3>
              <p className="text-white/80 mb-4">5000+ practice questions</p>
              <Button variant="secondary" className="bg-white text-purple-600">Practice Now</Button>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-600 to-teal-600 text-white">
            <CardContent className="p-8 text-center">
              <Award className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Video Lectures</h3>
              <p className="text-white/80 mb-4">Expert-led video courses</p>
              <button 
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
                onClick={() => {
    const element = document.querySelector('#videos-grid');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }}
>
  Watch Free
</button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

// Mock Tests Section
const MockTestsSection = () => {
  const tests = [
    { name: 'SSC CGL Full Mock', questions: 100, time: 60, attempts: 12500, difficulty: 'Medium' },
    { name: 'Bank PO Prelims', questions: 100, time: 60, attempts: 8900, difficulty: 'Easy' },
    { name: 'UPSC CSAT Practice', questions: 80, time: 120, attempts: 5600, difficulty: 'Hard' },
    { name: 'Railway NTPC Mock', questions: 100, time: 90, attempts: 15200, difficulty: 'Medium' },
    { name: 'SSC CHSL Tier 1', questions: 100, time: 60, attempts: 9800, difficulty: 'Easy' },
    { name: 'IBPS Clerk Mock', questions: 100, time: 60, attempts: 7200, difficulty: 'Medium' },
  ];

  return (
    <section id="mock-tests" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-purple-100 text-purple-700">Practice Tests</Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Free Mock Tests</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Practice with exam-like mock tests and analyze your performance
          </p>
        </div>

          <div id="videos-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
          {tests.map((test, idx) => (
            <Card key={idx} className="hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge className={`
                    ${test.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : ''}
                    ${test.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' : ''}
                    ${test.difficulty === 'Hard' ? 'bg-red-100 text-red-700' : ''}
                  `}>
                    {test.difficulty}
                  </Badge>
                  <span className="text-sm text-gray-500">{test.attempts.toLocaleString()} attempts</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{test.name}</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{test.questions}</p>
                    <p className="text-xs text-gray-600">Questions</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">{test.time}</p>
                    <p className="text-xs text-gray-600">Minutes</p>
                  </div>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Start Test
                  <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Test Series Banner */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0">
                  <Badge className="bg-white/20 text-white mb-4">Premium</Badge>
                  <h3 className="text-3xl font-bold mb-2">Complete Test Series</h3>
                  <p className="text-white/80 max-w-xl">
                    Get access to 100+ full-length mock tests with detailed analysis and performance tracking
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center text-white/90">
                      <ChevronRight className="w-5 h-5 mr-2" />
                      All exam categories covered
                    </li>
                    <li className="flex items-center text-white/90">
                      <ChevronRight className="w-5 h-5 mr-2" />
                      Detailed solutions and explanations
                    </li>
                    <li className="flex items-center text-white/90">
                      <ChevronRight className="w-5 h-5 mr-2" />
                      All India rank predictor
                    </li>
                  </ul>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold mb-2">₹499</p>
                  <p className="text-white/60 line-through mb-4">₹1,999</p>
                  <Button size="lg" className="bg-white text-indigo-600 hover:bg-white/90">
                    Get Premium
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
    </section>
  );
};

// Success Stories Section
const SuccessStoriesSection = () => {
  const stories = [
    {
      name: 'Rahul Sharma',
      rank: 'AIR 45',
      exam: 'UPSC CSE 2024',
      quote: 'The daily current affairs and mock tests on this platform were game-changers in my preparation.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    },
    {
      name: 'Priya Patel',
      rank: 'AIR 12',
      exam: 'SSC CGL 2024',
      quote: 'I cleared SSC CGL in my first attempt thanks to the comprehensive study materials and practice tests.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    },
    {
      name: 'Amit Kumar',
      rank: 'AIR 8',
      exam: 'IBPS PO 2024',
      quote: 'The topic-wise quizzes helped me identify my weak areas and improve significantly.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    },
  ];

  return (
    <section id="success-stories" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-yellow-100 text-yellow-700">
            <Star className="w-4 h-4 mr-1" />
            Success Stories
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Achievers</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Inspiring stories of students who achieved their dreams with our platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, idx) => (
            <Card key={idx} className="hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-24 h-24 rounded-full mx-auto mb-6 object-cover border-4 border-blue-100"
                />
                <div className="flex justify-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6">"{story.quote}"</p>
                <Separator className="my-4" />
                <h4 className="text-lg font-semibold text-gray-900">{story.name}</h4>
                <p className="text-blue-600 font-medium">{story.rank}</p>
                <p className="text-sm text-gray-500">{story.exam}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
            <CardContent className="p-12">
              <h3 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h3>
              <p className="text-white/80 max-w-2xl mx-auto mb-8">
                Join 50,000+ students preparing for government exams. Get free access to daily current affairs, 
                mock tests, and study materials.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-white/90">
                  Sign Up Free
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <Users className="mr-2 w-5 h-5" />
                  Join Community
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Exam Categories', href: '#exams' },
    { name: 'Current Affairs', href: '#current-affairs' },
    { name: 'Study Materials', href: '#study-materials' },
    { name: 'Mock Tests', href: '#mock-tests' },
    { name: 'Success Stories', href: '#success-stories' },
  ];

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">SarkariPrep</span>
            </a>
            <p className="text-gray-400 mb-6">
              Your trusted partner for government exam preparation. Join thousands of successful candidates.
            </p>
            <div className="flex space-x-4">
              {['Facebook', 'Twitter', 'Instagram', 'YouTube'].map((social) => (
                <a key={social} href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <span className="text-xs">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Exam Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Exam Categories</h4>
            <ul className="space-y-3">
              {['UPSC', 'SSC', 'Banking', 'Railway', 'Teaching', 'State PSC'].map((exam) => (
                <li key={exam}>
                  <a 
                    href="#exams" 
                    onClick={(e) => scrollToSection(e, '#exams')}
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {exam}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-3 text-gray-400">
              <li>vivekjyothula2</li>
              <li>+91 9603858118</li>
              <li>Mon-Sat: 9AM - 6PM</li>
            </ul>
            <div className="mt-6">
              <h5 className="font-medium mb-3">Subscribe to Newsletter</h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-gray-800 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button className="rounded-l-none bg-blue-600 hover:bg-blue-700">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-12 bg-gray-800" />

        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>© 2025 ExamPrep. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};


const VideoLecturesSection = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/api/videos')
      .then(res => res.json())
      .then(data => {
        setVideos(data.data || []);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section id="videos" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>Loading videos...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="videos" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium mb-4">
            Video Lectures
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Expert-led video courses
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Learn from top educators and clear your exams with confidence
          </p>
          <button 
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            onClick={() => {
              const element = document.getElementById('videos-grid');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Watch Free
          </button>
        </div>

        {/* Videos Grid */}
        <div id="videos-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video: any) => (
            <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {/* Thumbnail */}
              <div className="aspect-video relative group cursor-pointer bg-gray-900" onClick={() => window.open(video.youtubeUrl, '_blank')}>
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                  <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-t-6 border-t-transparent border-l-10 border-l-white border-b-6 border-b-transparent ml-1"></div>
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 text-xs rounded">
                  {video.duration}
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                    {video.subject}
                  </span>
                  <span className="text-xs text-gray-500">{video.views?.toLocaleString()} views</span>
                </div>
                <h3 className="font-bold text-base mb-1 text-gray-900 line-clamp-2">{video.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{video.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 font-medium">{video.instructor}</span>
                  <button 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                    onClick={() => window.open(video.youtubeUrl, '_blank')}
                  >
                    Watch
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Main App Component
function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <ExamCategoriesSection />
      <StudyMaterialsSection />
      <MockTestsSection />
      <VideoLecturesSection />
      <DailyNews />
      <SuccessStoriesSection />
      <Footer />
    </div>
  );
}

export default App;
